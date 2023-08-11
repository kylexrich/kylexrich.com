import React, { useState } from "react";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { fetchMostRecentResume, uploadResume } from "../../redux/uiSlice";
import ActionButton from "../molecules/ActionButton";

const ResumeSection: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const dispatch: AppDispatch = useDispatch();

  const handleOpenMostRecentResume = async () => {
    dispatch(fetchMostRecentResume())
      .unwrap()
      .then((resumeBlobUrl) => {
        window.open(resumeBlobUrl, "_blank");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUploadResume = () => {
    if (selectedFile) {
      dispatch(uploadResume(selectedFile));
    } else {
      alert("No file selected!");
    }
  };

  return (
    <div>
      <h1>Resume Section</h1>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <ActionButton label="Upload Resume" action={handleUploadResume} />
      <ActionButton label="Open Most Recent Resume" action={handleOpenMostRecentResume} />
    </div>
  );
};

export default ResumeSection;
