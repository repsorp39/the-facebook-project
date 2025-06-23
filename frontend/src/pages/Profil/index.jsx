import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "../../config/axios-config";
import Wrapper from "../../components/Wrapper";

const Profil = () => {
  const { userid: paramsUserId } = useParams();
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);
  const loginUser = useSelector((state) => state.auth.userinfo);

  async function fetchProfileInfo() {
    try {
      setIsLoading(true);
      if (loginUser.userid === +paramsUserId) {
        setUserInfo(loginUser);
        return;
      }
      const res = await axios.get(`/users/user.get.php/?id=${paramsUserId}`);
      setUserInfo(res.data);
    } catch (err) {
      console.log(err);
      setUserNotFound(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (paramsUserId) fetchProfileInfo();
  }, [paramsUserId]);

  const keys = [
    "userid",
    "email",
    "firstname",
    "lastname",
    "birthday",
    "gender",
  ];

  return (
    <Wrapper>
      <section>
        <section className='w-full h-[200px] bg-slate-300 place-content-center relativz'>
          <div className='mx-auto w-[200px] translate-y-24'>
            <figure className='image is-128x128'>
              <img src={userInfo.picture} alt='' className='is-rounded' />
            </figure>
          </div>
        </section>
        <h1 className='title ms-4 mt-8'>
          {`${userInfo.lastname} ${userInfo.firstname}`}
        </h1>
      </section>
      <section className='mt-5 user-info-section'>
        <table className='w-1/2 mx-auto'>
          <tbody>
            {keys.map((key, index) => {
              return (
                <tr key={index} className='p-3 '>
                  <th className='capitalize'> {key} </th>
                  <td> {userInfo[key]} </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </Wrapper>
  );
};

export default Profil;
