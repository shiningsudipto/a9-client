import { useGetUserByIdQuery } from "../../redux/features/auth";
import { useAppSelector } from "../../redux/hooks";
import { TUser, useCurrentUser } from "../../redux/slices/auth";

const Account = () => {
  const user = useAppSelector(useCurrentUser) as TUser;
  const { data } = useGetUserByIdQuery(user.id);
  const userData = data?.data;
  return (
    <div className="">
      <div className="w-[500px] p-5 bg-white rounded-md mx-auto mt-10">
        <div className="flex flex-col items-center space-y-2">
          <img
            src={userData?.avatar}
            alt=""
            className="size-[150px] rounded-full object-cover"
          />
          <p className="text-xl font-bold">{userData?.name}</p>
          <p className="text-lg font-medium">{userData?.email}</p>
        </div>
        <div className="mt-5 flex items-baseline gap-2">
          <p className="font-bold">Address:</p>
          <p>{userData?.address}</p>
        </div>
      </div>
    </div>
  );
};

export default Account;
