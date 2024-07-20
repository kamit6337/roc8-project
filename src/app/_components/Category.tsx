"use client";
import { useState } from "react";
import handleDeleteUserCategory from "~/actions/handleDeleteUserCategory";
import handleSaveUserCategory from "~/actions/handleSaveUserCategory";
import { Checkbox } from "~/components/ui/checkbox";
import Toastify from "./Toastify";

type List = {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
};

type UserCategory = {
  userId: string;
  categoryId: string;
  createdAt: Date;
};

type CategoryProps = {
  list: List[];
  userCategories: UserCategory[];
  userId: string;
};

const Category = ({ list, userCategories, userId }: CategoryProps) => {
  const [selected, setSelected] = useState<string[]>(() => {
    return userCategories.map((obj) => obj.categoryId);
  });
  const { ToastContainer, showErrorMessage, showSuccessMessage } = Toastify();

  const handleChecked = async (checked: boolean | string, id: string) => {
    try {
      if (checked) {
        const response = (await handleSaveUserCategory(userId, id)) as string;
        console.log("Save response", response);
        setSelected((prev: string[]): string[] => [...prev, id]);
        showSuccessMessage({ message: "Category saved successfully" });
        return;
      }

      const response = (await handleDeleteUserCategory(userId, id)) as string;
      console.log("delete response", response);

      setSelected(selected.filter((value) => value !== id));
      showSuccessMessage({ message: "Category removed successfully" });
    } catch (error) {
      showErrorMessage({ message: error?.message || "Something went wrong" });
    }
  };

  return (
    <>
      <div className="w-full space-y-5 self-start">
        {list.map((obj, i) => {
          const { id, title } = obj;

          return (
            <div key={i} className="flex items-center gap-3">
              <Checkbox
                className={`${selected.includes(id) ? "bg-black text-white" : "bg-checkbox_gray"} h-6 w-6 rounded-md`}
                checked={selected.includes(id)}
                onCheckedChange={async (checked) => {
                  await handleChecked(checked, id);
                }}
              />
              <p className="">{title}</p>
            </div>
          );
        })}
      </div>
      <ToastContainer />
    </>
  );
};

export default Category;