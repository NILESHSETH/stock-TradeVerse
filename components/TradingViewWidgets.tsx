// TradingViewWidget.js'x
'use client'
import React, {useRef, memo } from 'react';
import useTradingViewWidget from './hooks/useTradingViewWidgets';
import {cn} from "@/lib/utils";
interface TradingViewWidgetProps {
    title: string;
    scriptUrl: string;
    config: Record<string, unknown>;
    height?: number;
    className?: string;
}


const TradingViewWidget = ({title, scriptUrl, config, height = 600, className}: TradingViewWidgetProps) => {
  const container = useTradingViewWidget(scriptUrl, config, height);

  // this useeffect can be used a resulabe hook for the tradingview widget in the future if we want to use it in other components..whenever we try to render diffrent chart we can use this hook to render the chart in diffrent components
const containerRef = useTradingViewWidget(scriptUrl, config, height);

  return (
        <div className="w-full">
            {title && <h3 className="font-semibold text-2xl text-gray-100 mb-5">{title}</h3>}
            <div className={cn('tradingview-widget-container', className)} ref={containerRef}>
                <div className="tradingview-widget-container__widget" style={{ height, width: "100%" }} />
            </div>
        </div>
    );
}

export default memo(TradingViewWidget);
