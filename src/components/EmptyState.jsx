import React from 'react';
import { Link } from 'react-router-dom';
import { PackageOpen, Plus, ArrowRight, RefreshCw, Compass } from 'lucide-react';

export default function EmptyState({
  icon: Icon = PackageOpen,
  title = 'No Items Found',
  description = 'There are currently no items to display in this section.',
  actionLabel,
  onAction,
  actionLink,
  secondaryLabel,
  onSecondaryAction,
  className = ''
}) {
  return (
    <div className={`w-full py-12 px-6 rounded-3xl bg-[#071310]/80 dark:bg-[#071310]/80 border border-emerald-500/20 text-center flex flex-col items-center justify-center backdrop-blur-sm animate-in fade-in ${className}`}>
      {/* Ambient Halo & Icon */}
      <div className="relative mb-4">
        <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl pointer-events-none" />
        <div className="relative w-16 h-16 rounded-2xl bg-black/40 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-xl">
          {typeof Icon === 'string' ? (
            <span className="text-2xl">{Icon}</span>
          ) : (
            <Icon className="w-8 h-8 text-emerald-400" />
          )}
        </div>
      </div>

      {/* Typography */}
      <h3 className="text-base sm:text-lg font-bold text-white font-serif tracking-tight">
        {title}
      </h3>
      <p className="text-xs text-slate-400 max-w-md mx-auto mt-1.5 leading-relaxed">
        {description}
      </p>

      {/* Actions */}
      {(actionLabel || secondaryLabel) && (
        <div className="flex flex-wrap items-center justify-center gap-2.5 mt-5">
          {actionLink ? (
            <Link
              to={actionLink}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-amber-600 hover:from-emerald-500 hover:to-amber-500 text-white font-bold text-xs transition shadow-lg shadow-emerald-950/40 flex items-center gap-1.5"
            >
              <span>{actionLabel}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ) : actionLabel && onAction ? (
            <button
              type="button"
              onClick={onAction}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-amber-600 hover:from-emerald-500 hover:to-amber-500 text-white font-bold text-xs transition shadow-lg shadow-emerald-950/40 flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{actionLabel}</span>
            </button>
          ) : null}

          {secondaryLabel && onSecondaryAction && (
            <button
              type="button"
              onClick={onSecondaryAction}
              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-semibold text-xs border border-white/10 transition flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3 text-amber-400" />
              <span>{secondaryLabel}</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
