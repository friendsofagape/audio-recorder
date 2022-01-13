import React from 'react';
import { TrashIcon, MicrophoneIcon, VolumeUpIcon, PlayIcon, PauseIcon, RefreshIcon, MinusIcon, PlusIcon, CogIcon } from '@heroicons/react/outline';

export default function CustomPlayer() {
  return (
    <>
    <div style={{ width: '90%', height: '200px', borderRadius: '20px' }} className='bg-black text-white'>
        <div style={{ borderRadius: '20px', height: '80px', width: '80%' }} >
            <div className="flex p-2 px-4 justify-between items-center bg-black text-white">
                <div className="px-2 py-4 font-bold text-white text-sm tracking-wider">
                  10:30
                </div>
                
                    <div className="flex gap-5">
                    <div 
                    style={{
                    width:'30px', 
                    height: '0px', 
                    marginTop:'18px',
                    left:'97px',
                     top: '1.5px', /* White */ 
                     border: '1px solid #FFFFFF', 
                     transform: `rotate(${90}deg)`,
                     opacity: 0.5
                     }}>
                    </div>
                        <button type="button" style={{background: '#FF4D4D'}} className="p-2 rounded-md hover:bg-error">
                          <RefreshIcon
                            className="w-5 h-5"
                            aria-hidden="true"
                          />
                        </button>
                        <button type="button" style={{background: '#FF4D4D'}} className="p-2 rounded-md hover:bg-error">
                          <MicrophoneIcon
                            className="w-5 h-5"
                            aria-hidden="true"
                          />
                        </button>
                        <button type="button" className="p-2 bg-dark rounded-md hover:bg-primary">
                            <PlayIcon
                              className="w-5 h-5"
                              aria-hidden="true"
                            />
                          </button>
                          <button type="button" className="p-2 bg-dark rounded-md hover:bg-primary">
                            <PauseIcon
                              className="w-5 h-5"
                              aria-hidden="true"
                            />
                          </button>
                          <button type="button" className="p-2 bg-dark rounded-md hover:bg-error">
                            <TrashIcon
                              className="w-5 h-5"
                              aria-hidden="true"
                            />
                          </button>
                          <button type="button" className="rounded-md hover:bg-error">
                            <MinusIcon
                              className="w-5"
                              aria-hidden="true"
                            />
                          </button>
                          
                          <div style={{ backgroundColor: '#FFFFFF', marginTop:'18px', borderRadius: '20px', width: '100px',height: '8px', left: '340px',top: '12px'}}>
                            <div style={{ backgroundColor: '#0073E6', borderRadius: '20px', width: '70px',height: '8px', left: '340px',top: '12px'}}>
                            </div>
                          </div>
                          <button type="button" className="rounded-md hover:bg-error">
                            <PlusIcon
                              className="w-5"
                              aria-hidden="true"
                            />
                          </button>
                            <div style={{width:'30px', height: '0px', marginTop:'18px',left:'97px',top: '1.5px', /* White */ border: '1px solid #FFFFFF', transform: `rotate(${90}deg)`,opacity: 0.5}} />
                                <div className="flex p-2.5 justify-between items-center"
                                style={{ borderRadius:'50%', width:"40px", height: '40px', backgroundColor:"#40C000", left: "8.82%", right: "8.82%", top: "8.82%", bottom: "8.82%", }}>
                                    <span className="flex font-bold">
                                        A
                                    </span>
                                </div>
                                <div className="flex p-2.5 justify-between items-center"
                                style={{ borderRadius:'50%', width:"40px", height: '40px', backgroundColor:"#FFFF", left: "8.82%", right: "8.82%", top: "8.82%", bottom: "8.82%", }}>
                                <span className="flex font-bold text-dark">
                                    B
                                </span>
                                </div>
                                <div className="flex p-2.5 justify-between items-center"
                                style={{ borderRadius:'50%', width:"40px", height: '40px', backgroundColor:"#FFFF", left: "8.82%", right: "8.82%", top: "8.82%", bottom: "8.82%", }}>
                                <span className="flex font-bold text-dark">
                                    C
                                </span>
                                </div>
                            <div style={{width:'30px', height: '0px', marginTop:'18px',left:'97px',top: '1.5px', /* White */ border: '1px solid #FFFFFF', transform: `rotate(${90}deg)`,opacity: 0.5}} />
                            <button type="button" className="mb-1.5 rounded-md hover:bg-error">
                            <CogIcon
                              className="w-5 h-5"
                              aria-hidden="true"
                            />
                          </button>
                    </div>
                        
                </div>
            </div>
            <div className="flex p-2 px-4 justify-between items-center bg-black text-white">
                <button type="button" className="rounded-md hover:bg-error">
                    <div className="flex p-2.5 justify-between items-center" style={{ borderRadius:'50%', width:"40px", height: '40px',  backgroundColor:"#FFFF", left: "8.82%", right: "8.82%", top: "8.82%", bottom: "8.82%", }}>
                        <span className="flex font-bold text-dark">
                            1
                        </span>
                    </div>
                </button>
                <button type="button" className="rounded-md hover:bg-error">
                <div className="flex p-2.5 justify-between items-center" style={{ borderRadius:'50%', width:"40px", height: '40px',  backgroundColor:"#FFFF", left: "8.82%", right: "8.82%", top: "8.82%", bottom: "8.82%", }}>
                    <span className="flex font-bold text-dark">
                        2
                    </span>
                </div>
                </button>
                <button type="button" className="rounded-md hover:bg-error">
                <div className="flex p-2.5 justify-between items-center" style={{ borderRadius:'50%', width:"40px", height: '40px',  backgroundColor:"#FFFF", left: "8.82%", right: "8.82%", top: "8.82%", bottom: "8.82%", }}>
                    <span className="flex font-bold text-dark">
                        3
                    </span>
                </div>
                </button>
                <button type="button" className="rounded-md hover:bg-grey">
                <div className="flex p-2.5 justify-between hover:bg-grey items-center" style={{ borderRadius:'50%', width:"40px", height: '40px',  backgroundColor:"#FFFF", left: "8.82%", right: "8.82%", top: "8.82%", bottom: "8.82%", }}>
                    <span className="flex font-bold text-dark">
                        4
                    </span>
                </div>
                </button>
            </div>
            
    </div>
    </>
  );
}
