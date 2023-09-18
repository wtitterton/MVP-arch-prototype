import { MouseEventHandler } from "react";

interface Category {
  id: number;
  name: string;
}

interface CategoryListProps  {
  categories: Category[];
  onClick: MouseEventHandler<HTMLButtonElement>
}


export const CategoryList = ({categories, onClick} : CategoryListProps) => {
 const list = categories.map((category: Category) => {
    return (
       <button onClick={onClick} key={category.id}>{category.name}</button>
    )
  });
  return (
    <>
        <h2>Categories</h2>
        {list}
    </>
    
  )
}