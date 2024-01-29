import PromptCard from "./PromptCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-center">
        <span className="blue_gradient ">{name} Profile</span>
      </h1>
      <p className="desc text-center">{desc}</p>
      {data.length > 0 ? <h1>Total Posts : {data.length}</h1> : ""}
      {data.length > 0 ? (
        <div className="mt-10 prompt_layout">
          {data.map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
            />
          ))}
        </div>
      ) : (
        <h1 className="text-center pt-10 text-[25px] font-bold">
          There is no post...
        </h1>
      )}
    </section>
  );
};

export default Profile;
