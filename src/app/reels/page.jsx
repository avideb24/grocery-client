'use client';

import React, { useEffect, useState, useRef } from 'react';
import { getReels } from '@/libs/Reels/getReels';
import { FaPlay } from 'react-icons/fa';
import PageTitle from '@/components/shared/PageTitle/PageTitle';


const ReelsPage = () => {
    const [reels, setReels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [playingIndex, setPlayingIndex] = useState(null);
    const videoRefs = useRef([]);


    useEffect(() => {
        const fetchReels = async () => {
            setLoading(true);
            const data = await getReels();
            setReels(data);
            setLoading(false);
        };
        fetchReels();
    }, []);

    const handlePlayPause = (index) => {
        videoRefs.current.forEach((video, idx) => {
            if (idx !== index && video) {
                video.pause();
            }
        });

        const currentVideo = videoRefs.current[index];
        if (currentVideo.paused) {
            currentVideo.play();
            setPlayingIndex(index);
        } else {
            currentVideo.pause();
            setPlayingIndex(null);
        }
    };

    const handleVideoEnd = () => {
        setPlayingIndex(null);
    };

    return (
        <>

            <PageTitle title={'Reels'} />

            {/* title */}
            <h2 className='text-sm font-bold pb-5'>Enjoy Our Reels😊</h2>

            {/* reels */}

            <div>
                {
                    loading ? (
                        <div className="flex justify-center items-center h-screen">
                            <div className='flex justify-center -mt-40'>
                                <span className="loading loading-bars loading-lg bg-primary-color"></span>
                            </div>
                        </div>
                    ) : reels?.length == 0 ? (
                        <div className='font-bold pt-10'>No reels available</div>
                    ) : (
                        <div className="space-y-5">
                            {
                                reels.map((reel, index) => (
                                    <div
                                        key={reel?.id}
                                        className="relative w-full overflow-hidden" style={{ height: 'calc(100vh - 130px)' }} >
                                        <video ref={(el) => (videoRefs.current[index] = el)} src={reel?.url} className="absolute inset-0 w-full h-full object-cover" onClick={() => handlePlayPause(index)} onEnded={handleVideoEnd} />
                                        {
                                            playingIndex !== index && (
                                                <button onClick={() => handlePlayPause(index)} className="absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-50 hover:bg-opacity-75" >
                                                    <FaPlay className="text-4xl" />
                                                </button>
                                            )
                                        }
                                    </div>
                                ))}
                        </div>
                    )
                }
            </div>

        </>
    );
};

export default ReelsPage;
