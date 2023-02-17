import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IconThreeDot from "../../components/Icon/IconThreeDot";
import UserAvatarStory from "../../components/UserAvatarStory";
import IconSuggest from "../../components/Icon/IconSuggest";
import IconTagged from "../../components/Icon/IconTagged";
import IconReelsSmall from "../../components/Icon/IconReelsSmall";
import IconPostActive from "../../components/Icon/IconPostActive";
import IconArrowDown from "../../components/Icon/IconArrowDown";

import "./style.css";

const UserPage: React.FC = () => {
  const params = useParams<{ username: string }>();
  const [userInfor, setUserInfor] = useState<any>();
  const [checkFollow, setCheckFollow] = useState<any>();

  const fetchUser = async () => {
    // const data = await axios.get(`http://localhost:3000/api/v1/users/${params.username}`, {
    //   withCredentials: true,
    // });
    const data = await axios.get(`http://localhost:3000/api/v1/users/testtest`, {
      withCredentials: true,
    });
    console.log("🚀 ~ file: UserPage.tsx:12 ~ fetchUser ~ data", data.data.user);
    setUserInfor(data.data.user);

    const check = await axios.get(`http://localhost:3000/api/v1/follow/${data.data.user._id}`, {
      withCredentials: true,
    });
    setCheckFollow(check.data);
  };

  const handleFollow = async () => {
    const res = await axios.post(`http://localhost:3000/api/v1/follow/${userInfor._id}`, undefined, {
      withCredentials: true,
    });
    if (res.data.status === "success") {
      setCheckFollow((prev: any) => {
        return {
          ...prev,
          following: true,
        };
      });
    } else if (res.data.status === "fail") {
      setCheckFollow((prev: any) => {
        return {
          ...prev,
          following: false,
        };
      });
    }
  };

  const handleUnfollow = async () => {
    const res = await axios.delete(`http://localhost:3000/api/v1/follow/${userInfor._id}`, {
      withCredentials: true,
    });
    if (res.data.status === "success") {
      setCheckFollow((prev: any) => {
        return {
          ...prev,
          following: false,
        };
      });
    }
  };

  useEffect(() => {
    fetchUser();
  }, [params]);

  return (
    <div className="max-w-[935px] w-full mx-auto mt-0 mb-[30px] px-5 pt-[30px] pb-0">
      {/* Header */}
      <div className="flex gap-[30px] mb-[44px]">
        <div className="w-[30%] flex justify-center">
          <UserAvatarStory haveSeenBefore={false} size={150} url={userInfor?.avatar} />
        </div>
        <div className="mt-[12px]">
          <div className="flex items-center mb-[20px]">
            <p className="font-normal text-[20px] mr-5">{userInfor?.username}</p>

            {checkFollow?.following ? (
              <>
                <button
                  className="bg-post-separator flex items-center justify-center gap-2 rounded-[8px] mr-[12px] font-semibold px-[20px] py-[5px] text-[14px]"
                  onClick={handleUnfollow}
                >
                  Following
                  <div className="rotate">
                    <IconArrowDown />
                  </div>
                </button>
                <button className="bg-post-separator flex items-center justify-center gap-2 rounded-[8px] mr-[12px] font-semibold px-[20px] py-[5px] text-[14px]">
                  Message
                </button>
              </>
            ) : checkFollow?.followed ? (
              <button
                className="bg-primary-button text-white rounded-[8px] mr-[12px] font-semibold px-[20px] py-[5px] text-[14px]"
                onClick={handleFollow}
              >
                Follow Back
              </button>
            ) : (
              <button
                className="bg-primary-button text-white rounded-[8px] mr-[12px] font-semibold px-[20px] py-[5px] text-[14px]"
                onClick={handleFollow}
              >
                Follow
              </button>
            )}
            <button className="bg-post-separator p-2 rounded-lg flex items-center justify-center mr-[10px]">
              <IconSuggest />
            </button>
            <button className=" p-1 flex items-center justify-center">
              <IconThreeDot />
            </button>
          </div>
          <div className="flex mb-[20px] gap-10 text-[16px]">
            <p>
              <span className=" font-bold">5</span> post
            </p>
            <p>
              <span className=" font-bold">22</span> followers
            </p>
            <p>
              <span className=" font-bold">0</span> following
            </p>
          </div>
          <div>{userInfor?.fullname}</div>
          <div>{userInfor?.description}</div>
        </div>
      </div>

      {/* Story */}
      <div className="flex justify-start mx-[10px] gap-[15px]">
        <div className="flex flex-col justify-center items-center px-[15px]">
          <UserAvatarStory haveSeenBefore={true} size={77} url={userInfor?.avatar} />
          <p
            className="text-ellipsis overflow-hidden max-w-[74px] text-xs pt-[6px] px-[2px]"
            style={{ color: false ? "#8e8e8e" : "black" }}
          >
            {userInfor?.username}
          </p>
        </div>
        <div className="flex flex-col justify-center items-center px-[15px]">
          <UserAvatarStory haveSeenBefore={true} size={77} url={userInfor?.avatar} />
          <p
            className="text-ellipsis overflow-hidden max-w-[74px] text-xs pt-[6px] px-[2px]"
            style={{ color: false ? "#8e8e8e" : "black" }}
          >
            {userInfor?.username}
          </p>
        </div>
      </div>

      {/* Post */}
      <div className="w-full border-t-[1px] border-[rgb(219, 219, 219)] mt-[44px]">
        <ul className="flex justify-center gap-[60px]">
          <li className="flex items-center border-t-[1px] border-black justify-center text-[12px] gap-1 font-semibold tracking-[2px] py-[15px]">
            <IconPostActive /> POST
          </li>
          <li className="flex items-center justify-center text-[12px] gap-1 font-semibold tracking-[2px] py-[15px] text-secondary-text">
            <IconReelsSmall /> REELS
          </li>
          <li className="flex items-center justify-center text-[12px] gap-1 font-semibold tracking-[2px] py-[15px] text-secondary-text">
            <IconTagged /> TAGGED
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserPage;
