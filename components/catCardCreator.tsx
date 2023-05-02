import React, { useState, useEffect } from "react";
import styles from "@/styles/CardCreator.module.css";
import { CatCardProps } from "@/types/global";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const CatCardCreator: React.FC = () => {
  const [catName, setCatName] = useState<string>("");
  const [catImage, setCatImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const storedCatImage = localStorage.getItem("catImage");
    if (storedCatImage) {
      setCatImage(storedCatImage);
    }
  }, []);

  const handleCatNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCatName(event.target.value);
  };

  const handleGetCatImage = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://api.thecatapi.com/v1/images/search"
      );
      const data: CatCardProps[] = await response.json();
      setCatImage(data[0].url);
      localStorage.setItem("catImage", data[0].url);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveCat = () => {
    if (!catName) {
      const message = `You have to add cat name !!`;
      toast.error(message);
      return;
    }

    const newCat = { name: catName, image: catImage };
    const cats = JSON.parse(localStorage.getItem("cats") || "[]");
    cats.push(newCat);
    localStorage.setItem("cats", JSON.stringify(cats));
    const message = `Your cat "${catName}" has been saved!`;
    setCatName("");
    setCatImage(catImage);
    localStorage.removeItem("catImage");
    toast.success(message);
  };

  return (
    <div className={styles.catCardCreator}>
      <div className={styles.inputGroup}>
        <input
          id="catName"
          type="text"
          value={catName}
          onChange={handleCatNameChange}
          placeholder="Enter a name for your cat"
        />
        <button className={styles.edit}>
          <FontAwesomeIcon icon={faEdit} size={"xl"} />
        </button>
      </div>
      <div className={styles.inputGroup}>
        <div className={styles.imageInput}>
          {isLoading ? (
            <>
              <div className={styles.span}>Loading...</div>
            </>
          ) : (
            <img
              src={catImage}
              alt="Random cat image"
              onClick={handleGetCatImage}
              width={"500"}
              height={"300"}
              className={styles.img}
            />
          )}
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.reloadButton} onClick={handleGetCatImage}>
          Reload
        </button>
        <button className={styles.saveButton} onClick={handleSaveCat}>
          Save
        </button>
      </div>
    </div>
  );
};

export default CatCardCreator;
