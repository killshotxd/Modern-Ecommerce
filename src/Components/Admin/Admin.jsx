import React from "react";

const Admin = () => {
  return (
    <div className="containerWrap" style={{ marginTop: "7rem" }}>
      <h1 className="text-center text-2xl font-bold mb-3">
        List your item Here
      </h1>
      <div>
        <div>
          <div className="form-control w-full max-w-xs">
            <label className="label font-semibold mb-0 pb-0">
              <span className="label-text">Brad Name:</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              class="input input-bordered input-md w-full max-w-xs"
            />
          </div>
        </div>
        <div>
          <div className="form-control w-full max-w-xs">
            <label className="label font-semibold mb-0 pb-0">
              <span className="label-text">Brad Color:</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              class="input input-bordered input-md w-full max-w-xs"
            />
          </div>
        </div>
        <div>
          <div className="form-control w-full max-w-xs">
            <label className="label font-semibold mb-0 pb-0">
              <span className="label-text">Link:</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              class="input input-bordered input-md w-full max-w-xs"
            />
          </div>
        </div>
        <div>
          <div className="form-control w-full max-w-xs">
            <label className="label font-semibold mb-0 pb-0">
              <span className="label-text">Image Art :</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              class="input input-bordered input-md w-full max-w-xs"
            />
          </div>
        </div>
        <div>
          <div className="form-control w-full max-w-xs">
            <label className="label font-semibold mb-0 pb-0">
              <span className="label-text">Image Src :</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              class="input input-bordered input-md w-full max-w-xs"
            />
          </div>
        </div>
        <div>
          <div className="form-control w-full max-w-xs">
            <label className="label font-semibold mb-0 pb-0">
              <span className="label-text">Price:</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              class="input input-bordered input-md w-full max-w-xs"
            />
          </div>
        </div>
        <div>
          <div className="form-control w-full max-w-xs">
            <label className="label font-semibold mb-0 pb-0">
              <span className="label-text">Quantity:</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              class="input input-bordered input-md w-full max-w-xs"
            />
          </div>
        </div>
      </div>
      <div className="mt-3">
      <button className="btn btn-active btn-ghost">submit</button>
      </div>
    </div>
  );
};

export default Admin;
