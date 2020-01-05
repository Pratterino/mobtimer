import * as React from 'react';
import { useEffect, useState } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { getParsedTimeRemaining } from './helper/TimerHelper';
import { fetchBackgroundImage } from './unsplashedActions';
import LazyLoad from 'react-lazy-load';
import Timer from './timer/Timer';
import Users from './user/Users';
import Notifications from './notifications/Notifications';
import Settings from './settings/Settings';
import SoundSelector from './sound/SoundSelector';
import ImageLoader from './helper/ImageLoader';
import './App.scss';

interface Props {
    timer: {
        leaderboard: Leaderboard
        metadata: {
            todaysSessionLength: number;
        };
    };
    settings: {
        devMode: boolean;
    };
    test?: object;
}

interface Leaderboard {
    [key: string]: number;
}

interface Unsplash {
    userLink: string;
    username: string;
    unsplashedLink: string;
    image: string;
    imageSmall: string;
}

function App({ timer, settings, test }: Props) {
    const [unsplash, setUnsplash] = useState<Unsplash | undefined>();

    useEffect(() => {
        fetchBackgroundImage().then(unsplashed => setUnsplash(unsplashed));
    }, []);

    const renderLeaderboard = () => {
        const sortedLeaderboard = sortProperties(timer.leaderboard);
        return (
            <ol>
                {sortedLeaderboard.map((item, i) => (
                    <li>
                        {item[0]} ({getParsedTimeRemaining(item[1])})
                    </li>
                ))}
            </ol>
        );
    };

    const sortProperties = (obj: Leaderboard) => {
        const sortable = [];
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                sortable.push([key, obj[key]]);
            }
        }
        sortable.sort((a, b) => +b[1] - +a[1]);
        return sortable;
    };

    return (
        <>
            <div className="app">
                {settings.devMode && false && (
                    <div className="hide">
                        <h3>ReduxState</h3>
                        <pre>{JSON.stringify(test, null, 2)}</pre>
                    </div>
                )}

                <Notifications/>
                <Settings/>
                <Users/>
                <Timer/>

                <footer>
                    <div className="footer__item">
                        <h4>Today's leaderboard</h4>
                        {renderLeaderboard()}
                    </div>

                    <div className="footer__item center">
                        <h4>Today's active mob time</h4>
                        <p>{getParsedTimeRemaining(timer.metadata.todaysSessionLength)}</p>
                    </div>

                    <div className="footer__item"/>
                    <div className="footer__item center">
                        <h4>Finish sound</h4>
                        <SoundSelector/>
                    </div>
                    <div className="footer__item">
                        {unsplash && (
                            <div className="unsplashed-credits">
                                Photo by <a href={unsplash.userLink}>{unsplash.username}</a> on{' '}
                                <a href={unsplash.unsplashedLink}>Unsplash</a>
                            </div>
                        )}
                    </div>
                </footer>
            </div>

            <div id="bg-image">
                {unsplash && (
                    <LazyLoad
                        width={100}
                        height={100}
                        debounce={false}
                        offsetVertical={500}
                    >
                        <ImageLoader src={unsplash.image} />
                    </LazyLoad>
                )}
            </div>
        </>
    );
}

const mapStateToProps = (state: any) => ({
    test: state,
    settings: state.settings,
    timer: state.timer,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({}, dispatch);

export const unwrapped = App;
export default connect(mapStateToProps, mapDispatchToProps)(App);
