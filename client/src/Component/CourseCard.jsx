import { useNavigate } from "react-router-dom";

function CourseCard({data}) {
  const navigate = useNavigate();

  return (
    <div onClick={()=>navigate('/course/description/')}
    className="text-white w-[22rem] h-[430px] shadow-lg rounded-lg cursor-pointer group overflow-hidden pt-4 bg-slate-700 text-center">
      <div className="overflow-hidden">
        <img
          src={data?.thumbnail?.secure_url}
          alt="Course Thumbnail"
          className="h-48 w-80 rounded-tl-lg rounded-tr-lg group-hover:scale = [1,2] transition-all ease-in-out duration-300 pl-5"
        />
        <div className="p-3 space-y-1 text-white">
          <h2 className="font-bold text-yellow-500 line-clamp-2">
            {data?.title}
          </h2>
          <p className="line-clamp-2 text-xl">{data?.description}</p>
          <p className="font-bold text-xl">
            <span className="font-bold text-yellow-500 text-xl">Category:</span>
            {data?.category}
          </p>
          <p className="font-bold  text-xl">
            <span className="font-bold text-yellow-500 text-xl">Total Lectures:</span>
            {data?.numberofLecture}
          </p>
          <p className="font-bold  text-xl">
            <span className="font-bold text-yellow-500 text-xl">Instructor:</span>
            {data?.createdBy}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
