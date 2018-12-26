import React, { Component } from 'react';

class RightSidebar extends Component {
    render() {
        return (
            <div className="w-full lg:w-1/4 pl-4">
                <div className="bg-white p-3 mb-3">
                    <div>
                        <span className="text-lg font-bold">Who to follow</span>
                        {/* <span>·</span>
                        <span>
                            <a href="#" className="text-teal text-xs">Refresh</a>
                        </span>
                        <span>·</span>
                        <span>
                            <a href="#" className="text-teal text-xs">View All</a>
                        </span> */}
                    </div>
                    <div className="flex border-b border-solid border-grey-light">
                        <div className="py-2">
                            <a href="#">
                                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_follow1.jpg" alt="follow1" className="rounded-full h-12 w-12" />
                            </a>
                        </div>
                        <div className="pl-2 py-2 w-full">
                            <div className="flex justify-between mb-1">
                                <div>
                                    <a href="#" className="font-bold text-black word-break" style={{wordBreak: 'break-all'}}>GA6IW2JOWMP4WGI6LYAZ76ZPMFQSJAX4YLJLOQOWFC5VF5C6IGNV2IW7</a>
                                    {/* <a href="#" className="text-grey-dark">@nuxt_js</a> */}
                                </div>
                                <div>
                                    <a href="#" className="text-grey hover:text-grey-dark">
                                        <i className="fa fa-times" />
                                    </a>
                                </div>
                            </div>
                            <div>
                                <button className="bg-transparent text-xs hover:bg-teal text-teal font-semibold hover:text-white py-2 px-6 border border-teal hover:border-transparent rounded-full">
                                    Follow
                                    </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex border-b border-solid border-grey-light">
                        <div className="py-2">
                            <a href="#">
                                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_follow2.jpg" alt="follow1" className="rounded-full h-12 w-12" />
                            </a>
                        </div>
                        <div className="pl-2 py-2 w-full">
                            <div className="flex justify-between mb-1">
                                <div>
                                    <a href="#" className="font-bold text-black" style={{wordBreak: 'break-all'}}>GA6IW2JOWMP4WGI6LYAZ76ZPMFQSJAX4YLJLOQOWFC5VF5C6IGNV2IW7</a>
                                    {/* <a href="#" className="text-grey-dark">@LaraconEU</a> */}
                                </div>
                                <div>
                                    <a href="#" className="text-grey hover:text-grey-dark">
                                        <i className="fa fa-times" />
                                    </a>
                                </div>
                            </div>
                            <div>
                                <button className="bg-transparent text-xs hover:bg-teal text-teal font-semibold hover:text-white py-2 px-6 border border-teal hover:border-transparent rounded-full">
                                    Follow
                                    </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex border-b border-solid border-grey-light">
                        <div className="py-2">
                            <a href="#">
                                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_follow3.jpg" alt="follow1" className="rounded-full h-12 w-12" />
                            </a>
                        </div>
                        <div className="pl-2 py-2 w-full">
                            <div className="flex justify-between mb-1">
                                <div>
                                    <a href="#" className="font-bold text-black" style={{wordBreak: 'break-all'}}>GA6IW2JOWMP4WGI6LYAZ76ZPMFQSJAX4YLJLOQOWFC5VF5C6IGNV2IW7</a>
                                    {/* <a href="#" className="text-grey-dark">@LaraconUS</a> */}
                                </div>
                                <div>
                                    <a href="#" className="text-grey hover:text-grey-dark">
                                        <i className="fa fa-times" />
                                    </a>
                                </div>
                            </div>
                            <div>
                                <button className="bg-transparent text-xs hover:bg-teal text-teal font-semibold hover:text-white py-2 px-6 border border-teal hover:border-transparent rounded-full">
                                    Follow
                                    </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex border-b border-solid border-grey-light"  >
                        {/* <div className="py-4">
                            <a href="#" className=" p-1">
                                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_outlook.png" alt="follow1" className="rounded h-6 w-6" />
                            </a>
                        </div> */}
                        <div className="pl-2 py-2 w-full" style={{textAlign:'center', marginLeft:'20%'}}>
                            <div className="flex justify-between" >
                            <button  className="bg-teal hover:bg-teal-dark text-white font-medium py-2 px-4 rounded-full" style={{textAlign:'center'}}>
                                Load more
                            </button>
                                {/* <div>
                                    <a href="#" className="font-bold text-black" >Load more</a>
                                </div> */}
                            </div>
                            
                        </div>
                    </div>
                    <div className="pt-2">
                        <a href="#" className="text-teal text-xs">Connect other address book</a>
                    </div>
                </div>
                <div className="bg-white p-3 mb-3">
                    <div className="mb-3">
                        <span className="text-lg font-bold">Trends for you</span>
                        <span>·</span>
                        <span>
                            <a href="#" className="text-teal text-xs">Change</a>
                        </span>
                    </div>
                    <div className="mb-3 leading-tight">
                        <div>
                            <a href="#" className="text-teal font-bold">Happy New Year</a>
                        </div>
                        <div>
                            <a href="#" className="text-grey-dark text-xs">645K Tweets</a>
                        </div>
                    </div>
                    <div className="mb-3 leading-tight">
                        <div>
                            <a href="#" className="text-teal font-bold">Happy 2018</a>
                        </div>
                        <div>
                            <a href="#" className="text-grey-dark text-xs">NYE 2018 Celebrations</a>
                        </div>
                    </div>
                    <div className="mb-3 leading-tight">
                        <div>
                            <a href="#" className="text-teal font-bold">#ByeBye2017</a>
                        </div>
                        <div>
                            <a href="#" className="text-grey-dark text-xs">21.7K Tweets</a>
                        </div>
                    </div>
                    <div className="mb-3 leading-tight">
                        <div>
                            <a href="#" className="text-teal font-bold">#SomeHashTag</a>
                        </div>
                        <div>
                            <a href="#" className="text-grey-dark text-xs">45K Tweets</a>
                        </div>
                    </div>
                    <div className="mb-3 leading-tight">
                        <div>
                            <a href="#" className="text-teal font-bold">Something Trending</a>
                        </div>
                        <div>
                            <a href="#" className="text-grey-dark text-xs">36K Tweets</a>
                        </div>
                    </div>
                    <div className="mb-3 leading-tight">
                        <div>
                            <a href="#" className="text-teal font-bold">#ColdAF</a>
                        </div>
                        <div>
                            <a href="#" className="text-grey-dark text-xs">100K Tweets</a>
                        </div>
                    </div>
                </div>
                <div className="mb-3 text-xs">
                    <span className="mr-2">
                        <a href="#" className="text-grey-darker">© 2018 Twitter</a>
                    </span>
                    <span className="mr-2">
                        <a href="#" className="text-grey-darker">About</a>
                    </span>
                    <span className="mr-2">
                        <a href="#" className="text-grey-darker">Help Center</a>
                    </span>
                    <span className="mr-2">
                        <a href="#" className="text-grey-darker">Terms</a>
                    </span>
                    <span className="mr-2">
                        <a href="#" className="text-grey-darker">Privacy policy</a>
                    </span>
                    <span className="mr-2">
                        <a href="#" className="text-grey-darker">Cookies</a>
                    </span>
                    <span className="mr-2">
                        <a href="#" className="text-grey-darker">Ads info</a>
                    </span>
                </div>
            </div>
        );
    }
}

export default RightSidebar;