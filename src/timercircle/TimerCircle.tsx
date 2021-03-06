import React, { useState } from 'react';
import classNames from 'classnames';
import TimeRemaining from '../timeremaining/TimeRemaining';
import { getPercentageLeftOfTime, getValueFromCSSVariable, lightenDarkenColor } from '../helper/TimerHelper';
import './TimerCircle.scss';

interface IProps {
    timer: {
        active: boolean,
        currentTime: number,
        sessionLength: number,
    }
}

export function TimerCircle({ timer}: IProps) {
    // @ts-ignore
    const circleGradient = timer.active ? 'active' : 'inactive';
    const backgroundColor = '--background';
    const activeColor = '--active-timer-color';
    const stopColor = '--stopped-timer-color';
    const luminance = 0.5;

    const [stopColors] = useState({
        background: lightenDarkenColor(getValueFromCSSVariable(backgroundColor), luminance),
        inactive: lightenDarkenColor(getValueFromCSSVariable(stopColor), luminance),
        active: lightenDarkenColor(getValueFromCSSVariable(activeColor), luminance),
    });

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <svg
                className={classNames('circle-chart', circleGradient)}
                viewBox="0 0 33.83098862 33.83098862"
                width="225"
                height="225"
                xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="background" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={`var(${backgroundColor})`} />
                        <stop offset="100%" stopColor={stopColors.background} />
                    </linearGradient>
                    <linearGradient id="inactive" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={`var(${stopColor})`} />
                        <stop offset="100%" stopColor={stopColors.inactive} />
                    </linearGradient>
                    <linearGradient id="active" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={`var(${activeColor})`} />
                        <stop offset="100%" stopColor={stopColors.active} />
                    </linearGradient>
                </defs>
                <circle
                    className="circle-chart__background"
                    stroke="url(#background)"
                    strokeWidth="3"
                    fill="none"
                    cx="16.91549431"
                    cy="16.91549431"
                    r="15.91549431"
                />
                <circle
                    className={`circle-chart__circle`}
                    stroke={`url(#${circleGradient})`}
                    strokeWidth="3"
                    strokeDasharray={`${getPercentageLeftOfTime(timer.currentTime, timer.sessionLength) || 100},100`}
                    strokeLinecap="round"
                    fill="none"
                    cx="16.91549431"
                    cy="16.91549431"
                    r="15.91549431"
                />
            </svg>
            <TimeRemaining timer={timer} />
        </div>
    );
}
