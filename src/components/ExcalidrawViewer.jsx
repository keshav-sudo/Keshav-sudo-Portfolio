import { useEffect, useRef } from 'react';
import './ExcalidrawViewer.css';

/**
 * Lazy-load the heavy Excalidraw component so the main bundle stays light.
 * We use a dynamic import + a wrapper that shows a skeleton while loading.
 */
let ExcalidrawModule = null;

export default function ExcalidrawViewer({ sceneData, height = 400 }) {
    const containerRef = useRef(null);

    // We render using Excalidraw's exportToSvg utility — no UI, just pure SVG
    useEffect(() => {
        if (!sceneData || !containerRef.current) return;

        let cancelled = false;

        (async () => {
            try {
                if (!ExcalidrawModule) {
                    ExcalidrawModule = await import('@excalidraw/excalidraw');
                }
                const { exportToSvg } = ExcalidrawModule;

                const svg = await exportToSvg({
                    elements: sceneData.elements || [],
                    appState: {
                        ...(sceneData.appState || {}),
                        exportBackground: true,
                        exportWithDarkMode: false,
                        theme: 'light',
                    },
                    files: sceneData.files || null,
                    exportPadding: 32,
                });

                if (cancelled) return;

                // Style the SVG to fill container
                svg.setAttribute('width', '100%');
                svg.setAttribute('height', '100%');
                svg.style.maxHeight = `${height}px`;
                svg.style.borderRadius = '8px';

                const container = containerRef.current;
                container.innerHTML = '';
                container.appendChild(svg);
            } catch (err) {
                console.error('ExcalidrawViewer error:', err);
            }
        })();

        return () => { cancelled = true; };
    }, [sceneData, height]);

    if (!sceneData) return null;

    return (
        <div className="excalidraw-viewer" ref={containerRef} style={{ minHeight: height }}>
            <div className="excalidraw-skeleton">
                <div className="sk-line" />
                <div className="sk-line short" />
                <div className="sk-line" />
            </div>
        </div>
    );
}
