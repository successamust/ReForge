import { useState, useCallback } from 'react';

export default function useUndoRedo(initialState) {
    const [past, setPast] = useState([]);
    const [present, setPresent] = useState(initialState);
    const [future, setFuture] = useState([]);

    const canUndo = past.length > 0;
    const canRedo = future.length > 0;

    const undo = useCallback(() => {
        if (!canUndo) return;

        const previous = past[past.length - 1];
        const newPast = past.slice(0, past.length - 1);

        setFuture([present, ...future]);
        setPresent(previous);
        setPast(newPast);
    }, [canUndo, past, present, future]);

    const redo = useCallback(() => {
        if (!canRedo) return;

        const next = future[0];
        const newFuture = future.slice(1);

        setPast([...past, present]);
        setPresent(next);
        setFuture(newFuture);
    }, [canRedo, future, past, present]);

    const set = useCallback((newPresent) => {
        if (newPresent === present) return;

        setPast([...past, present]);
        setPresent(newPresent);
        setFuture([]);
    }, [past, present]);

    const reset = useCallback((newPresent) => {
        setPast([]);
        setPresent(newPresent);
        setFuture([]);
    }, []);

    return [present, set, undo, redo, canUndo, canRedo, reset];
}
