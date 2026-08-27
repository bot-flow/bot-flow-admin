"use client";

import Modeler from "bpmn-js/lib/Modeler";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
import "bpmn-js/dist/assets/diagram-js.css";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

export interface BpmnModelerHandle {
  exportXml: () => Promise<string>;
  fitViewport: () => void;
}

interface BpmnModelerProps {
  xml: string;
  onChanged: () => void;
  onImportError: (message: string) => void;
}

interface CanvasService {
  zoom: (value: "fit-viewport") => void;
}

export const BpmnModeler = forwardRef<BpmnModelerHandle, BpmnModelerProps>(
  function BpmnModeler({ xml, onChanged, onImportError }, ref) {
    const containerRef = useRef<HTMLDivElement>(null);
    const modelerRef = useRef<Modeler | null>(null);
    const importingRef = useRef(false);
    const changedCallbackRef = useRef(onChanged);
    const errorCallbackRef = useRef(onImportError);

    changedCallbackRef.current = onChanged;
    errorCallbackRef.current = onImportError;

    useImperativeHandle(ref, () => ({
      async exportXml() {
        const result = await modelerRef.current?.saveXML({ format: true });
        if (!result?.xml) throw new Error("No BPMN diagram is loaded");
        return result.xml;
      },
      fitViewport() {
        modelerRef.current
          ?.get<CanvasService>("canvas")
          .zoom("fit-viewport");
      },
    }));

    useEffect(() => {
      if (!containerRef.current) return;
      const modeler = new Modeler({ container: containerRef.current });
      modelerRef.current = modeler;
      modeler.on("commandStack.changed", () => {
        if (!importingRef.current) changedCallbackRef.current();
      });
      return () => {
        modeler.destroy();
        modelerRef.current = null;
      };
    }, []);

    useEffect(() => {
      const modeler = modelerRef.current;
      if (!modeler) return;
      importingRef.current = true;
      modeler
        .importXML(xml)
        .then(() => {
          modeler.get<CanvasService>("canvas").zoom("fit-viewport");
        })
        .catch((error: unknown) => {
          const message = error instanceof Error ? error.message : "Unable to load BPMN XML";
          errorCallbackRef.current(message);
        })
        .finally(() => {
          importingRef.current = false;
        });
    }, [xml]);

    return (
      <div
        ref={containerRef}
        className="h-[620px] min-h-[460px] w-full bg-background-50"
        aria-label="BPMN workflow modeler"
      />
    );
  },
);
