import axios from "axios";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import "./AnswerQuestion.css";
import REACT_APP_base_url from "../../baseUrl";
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';

const AnswerQuestion = ({ questionId }) => {
  const [userData, setUserData] = useContext(UserContext);

  const [form, setForm] = useState({});
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${REACT_APP_base_url}/api/answer`, {
        id: userData.user.id,
        questionId: questionId,
        answer: form.answer,
      });
      window.location.reload(false);
    } catch (err) {
      console.log("problem", err);
    }
  };
  return (
    <div className="container my-5">
      <form
        onSubmit={handleSubmit}
        className="d-flex flex-column p-5 answer_form  justify-content-between"
      >
        <h3 className="">Answer The Top Question</h3>
        <Link to="/" className="text-decoration-none text-reset cursor-pointer">
          Go to Question page
        </Link>
        <textarea
          onChange={handleChange}
          className="answer_input"
          placeholder="Your Answer..."
          name="answer"
          id=""
        ></textarea>
        <button className="answer_post_btn" type="submit">
          Post Your Answer
        </button>
      </form>
    </div>
  );
};

export default AnswerQuestion;
