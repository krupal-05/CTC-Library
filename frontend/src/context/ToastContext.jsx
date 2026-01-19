import React, { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const ToastContext = createContext();

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'info', duration = 3000) => {
        const id = Date.now() + Math.random();
        const toast = { id, message, type };

        setToasts(prev => [...prev, toast]);

        if (duration) {
            setTimeout(() => {
                removeToast(id);
            }, duration);
        }
    }, []);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }, []);

    const success = (message, duration) => addToast(message, 'success', duration);
    const error = (message, duration) => addToast(message, 'error', duration);
    const warning = (message, duration) => addToast(message, 'warning', duration);
    const info = (message, duration) => addToast(message, 'info', duration);

    return (
        <ToastContext.Provider value={{ addToast, removeToast, success, error, warning, info }}>
            {children}
            <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-3 pointer-events-none">
                {toasts.map(toast => (
                    <div
                        key={toast.id}
                        className={`
                            pointer-events-auto min-w-[300px] max-w-sm p-4 rounded-xl shadow-lg border-l-4 transform transition-all duration-300 animate-slide-in
                            ${toast.type === 'success' ? 'bg-white border-green-500 text-gray-800' : ''}
                            ${toast.type === 'error' ? 'bg-white border-red-500 text-gray-800' : ''}
                            ${toast.type === 'warning' ? 'bg-white border-amber-500 text-gray-800' : ''}
                            ${toast.type === 'info' ? 'bg-white border-blue-500 text-gray-800' : ''}
                        `}
                    >
                        <div className="flex items-start gap-3">
                            <span className={`mt-0.5
                                ${toast.type === 'success' ? 'text-green-500' : ''}
                                ${toast.type === 'error' ? 'text-red-500' : ''}
                                ${toast.type === 'warning' ? 'text-amber-500' : ''}
                                ${toast.type === 'info' ? 'text-blue-500' : ''}
                            `}>
                                {toast.type === 'success' && <CheckCircle size={20} />}
                                {toast.type === 'error' && <AlertCircle size={20} />}
                                {toast.type === 'warning' && <AlertTriangle size={20} />}
                                {toast.type === 'info' && <Info size={20} />}
                            </span>
                            <p className="flex-1 text-sm font-medium leading-tight">{toast.message}</p>
                            <button
                                onClick={() => removeToast(toast.id)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};
