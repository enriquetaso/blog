'use client';

import { useEffect, useState } from 'react';

export default function MermaidRenderer() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if there are any mermaid blocks before loading the library
    const mermaidBlocks = document.querySelectorAll('pre code.language-mermaid');
    
    if (mermaidBlocks.length === 0) {
      setIsLoading(false);
      return;
    }

    // Dynamically import mermaid only when needed
    const loadAndRenderMermaid = async () => {
      try {
        const mermaid = (await import('mermaid')).default;
        
        // Initialize mermaid
        mermaid.initialize({
          startOnLoad: false,
          theme: 'default',
          securityLevel: 'loose',
        });

        // Convert code blocks to mermaid divs
        for (let i = 0; i < mermaidBlocks.length; i++) {
          const block = mermaidBlocks[i];
          const pre = block.parentElement;
          const code = block.textContent;
          
          // Create a div to hold the mermaid diagram
          const div = document.createElement('div');
          div.className = 'mermaid';
          div.textContent = code;
          
          // Replace the pre/code block with the mermaid div
          pre.replaceWith(div);
        }
        
        // Render all mermaid diagrams
        await mermaid.run();
        setIsLoading(false);
      } catch (error) {
        console.error('Mermaid error:', error);
        setIsLoading(false);
      }
    };

    loadAndRenderMermaid();
  }, []);

  return null;
}

