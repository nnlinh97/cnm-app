import React, { Component } from 'react';

class MenuTop extends Component {
    componentDidMount() {
        
    }
    
    render() {
        return (
            <div className="bg-white shadow">
                <div className="container mx-auto flex flex-col lg:flex-row items-center lg:relative">
                    <div className="w-full lg:w-1/4">
                        <img src="https://tinyurl.com/yapenv5f" alt="logo" className="rounded-full h-48 w-48 lg:absolute lg:pin-l lg:pin-t lg:-mt-24" />
                    </div>
                    <div className="w-full lg:w-1/2">
                        <ul className="list-reset flex">
                            <li className="text-center py-3 px-4 border-b-2 border-solid border-transparent border-teal">
                                <a href="#" className="text-grey-darker no-underline hover:no-underline">
                                    <div className="text-sm font-bold tracking-tight mb-1">Tweets</div>
                                    <div className="text-lg tracking-tight font-bold text-teal">60</div>
                                </a>
                            </li>
                            <li className="text-center py-3 px-4 border-b-2 border-solid border-transparent hover:border-teal">
                                <a href="#" className="text-grey-darker no-underline hover:no-underline">
                                    <div className="text-sm font-bold tracking-tight mb-1">Following</div>
                                    <div className="text-lg tracking-tight font-bold hover:text-teal">4</div>
                                </a>
                            </li>
                            <li className="text-center py-3 px-4 border-b-2 border-solid border-transparent hover:border-teal">
                                <a href="#" className="text-grey-darker no-underline hover:no-underline">
                                    <div className="text-sm font-bold tracking-tight mb-1">Followers</div>
                                    <div className="text-lg tracking-tight font-bold hover:text-teal">3,810</div>
                                </a>
                            </li>
                            <li className="text-center py-3 px-4 border-b-2 border-solid border-transparent hover:border-teal">
                                <a href="#" className="text-grey-darker no-underline hover:no-underline">
                                    <div className="text-sm font-bold tracking-tight mb-1">Likes</div>
                                    <div className="text-lg tracking-tight font-bold hover:text-teal">9</div>
                                </a>
                            </li>
                            <li className="text-center py-3 px-4 border-b-2 border-solid border-transparent hover:border-teal">
                                <a href="#" className="text-grey-darker no-underline hover:no-underline">
                                    <div className="text-sm font-bold tracking-tight mb-1">Moments</div>
                                    <div className="text-lg tracking-tight font-bold hover:text-teal">1</div>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full lg:w-1/4 flex my-4 lg:my-0 lg:justify-end items-center">
                        <div className="mr-6">
                            <button className="bg-teal hover:bg-teal-dark text-white font-medium py-2 px-4 rounded-full">Following</button>
                        </div>
                        <div>
                            <a href="#" className="text-grey-dark">
                                <i className="fa fa-ellipsis-v fa-lg" />
                            </a>
                        </div>
                    </div>
                </div>
                {/* end container */}
            </div>

        );
    }
}

export default MenuTop;