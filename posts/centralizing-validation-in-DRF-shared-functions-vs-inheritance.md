---
title: "Centralizing Validation in DRF: Shared Functions vs Inheritance"
date: "2025-09-25"
description: "When working with Django REST Framework, validations often start scattered across serializers, leading to duplication and inconsistencies. This post shares a real-world case where two serializers handled the same model differently, creating mismatched validation rules. I’ll walk through why validators = [], parent serializers, or clean() weren’t the right solution, and how I extracted domain-specific rules into a shared validator module and mixin. The result: one single source of truth for validation, less code duplication, and easier evolution of legacy APIs."
tags: django, python, drf
---


# Context
When I started at my job, I inherited a Django application originally built as an internal tool. Over time, the project evolved into a backend for a frontend that non-technical users relied on. As a result, we ended up with **two different APIs** acting on the same models—but without shared code.

This became a problem: some validations existed in the “internal” version but were missing in the frontend-facing API.

The model itself stored the schema of database tables, reflecting SQL database constraints.

- One API endpoint accepted Excel files (`POST /import`) → **legacy template import**.  
- Another API accepted JSON payloads (`POST/PATCH/PUT`) → **frontend API**.  


```python
# django app legacy
class LegacySchemaSerializer(BaseTemplateSerializer, serializers.ModelSerializer):
    def validate_column_name(value: str) -> str:
        if not re.fullmatch(r"\w+", str(value)):
            raise serializers.ValidationError(
                f"Column name '{value}' must contain only letters, numbers, or underscores."
            )
        return value
    ...

# another django app 
class SchemaSerializer(serializers.ModelSerializer):
    def validate_column_name(self, value):
        instance = self.latest_instance
        if instance and instance.column_name != value:
            raise serializer.ValidationError(f”Cannot change column name…”)
        return value
    ...

```


# The Problem
I needed to **centralize validations** so they could act as a single source of truth and eliminate duplicate logic. Since the app used Django REST Framework (DRF), my focus was on serializers.

## Requirements & Domain Rules
- **Immutability**: columns, sequence numbers, ownership must not change.  
- **Monotonic constraints**: `max_length` and `scale` must not decrease.  
- **Allowed transitions**: only certain data type changes are valid.  
- **Primary key constraints**: must exist, limited characters, no special symbols.  
- **Context-specific rules**: local handling for legacy imports.  
- **Edge cases**:  
  - Partial updates shouldn’t infer field changes.  
  - New schemas skip “no decrease” checks.  
  - Avoid N+1 queries when fetching “latest” instances.  


## Things to Avoid
- Putting business validations in `model.clean()`: hurts performance in bulk inserts.  
- Overriding `save()` in serializers: keep validation inside `validate_*`.  
- Using a catch-all `validate(self, attrs)`: harder to debug per-field errors.  



## Refactor Plan
1. **Inventory rules**: make a table of all validations and their current location.  
2. **Extract shared logic**: move checks into reusable functions.  
3. **Replace inline logic**: call shared functions inside `validate_*` methods.  
4. **Test**: keep existing tests, add coverage for the new shared module.  
5. **Slim down serializers**: keep only workflow-specific validation in `validate()`.  

---

# Why Not `validators = []`
DRF’s `validators` run at object-level and after all field validation. This makes it harder to access contextual info (like `latest_instance`) and couples rules in ways that can cause side effects.

# Why Not a Parent Serializer
Direct inheritance between the two serializers introduces tight coupling. They differ in:

- Workflows: interactive create/update vs bulk import.  
- Error formats: field errors vs aggregated list.  
- Input preprocessing.  
- Performance needs (per-row vs bulk).  

Inheritance would make them harder to retire independently and risk hidden DRF behaviors.

# Solution: Shared Validator Module + Optional Mixin
I extracted reusable, composable functions into a **shared validator module**:

```python
# django app legacy
class LegacySchemaSerializer(BaseTemplateSerializer, serializers.ModelSerializer):
    def validate_column_name():
        return super().validate_column_name(value, is_request_from_legacy=True)
    ...

# another django app 
class SchemaSerializer(serializers.ModelSerializer):
    #  remove validate_column_name()
    ...

## validators.py
def is_letters_numbers_underscores_only(value:str) -> bool:
      return bool(re.fullmach(r”\w+”, str(value)))

class SchemaValidationMixin:
    def validate_column_name(self, value: str, is_request_from_legacy:bool=False) -> str:
        instance = getattr(self, “latest_instance”, None)
        if (not is_request_from_legacy) and instance and instance.column_name != value:
            raise serializer.ValidationError(f”Cannot change column name…”)

        if not is_letters_numbers_or_underscores_only(value):
            raise serializer.ValidationError(f“Column name ‘{value}’ must contain only characters, underscodere or numbers.”)
        return value

```

## Result

- One source of truth for validation rules.

- Legacy and new APIs both enforce domain rules consistently.

- Future-proof: legacy paths can be retired without affecting validation logic.

---

# 👉 Lessons Learned

- Favor shared validator functions first: they’re composable, easy to test, and keep responsibilities clear.

- Use mixins only if necessary: when serializers share significant structure (not just a few rules).

- Avoid parent serializers for divergent workflows: inheritance often introduces tight coupling and complexity.

- Keep validation close to the domain, not persistence: don’t overload models with business rules if they’re used in bulk operations.

- Plan for legacy retirement: designing with modular validators reduces lock-in and simplifies migration paths.