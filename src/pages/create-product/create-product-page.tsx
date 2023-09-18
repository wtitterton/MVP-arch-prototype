import { container } from "tsyringe";
import { observer } from 'mobx-react-lite';
import { Messages } from "../../core/messages/messages";
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod";
import { CreateProductPagePresenter } from "./presenter";
import { Category, ProductDto } from "../../repositories";

const schema = z.object({
 title: z.string().min(3).max(20),
 price: z.string().min(1),
 description: z.string().min(10).max(200),
 image: z.string().url(),
 category: z.string().nonempty(),                            
})

export const CreateProductPage = observer(() => {
 const {vm, create } = container.resolve(CreateProductPagePresenter);

 const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })

   const onSubmit: SubmitHandler<any> = async (productData: ProductDto) => {
        const result = await create(productData)
        if(result.success) {
          reset();
        }
   }
    return (
        <>
           <Messages />
           <h1> Create Product </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
             <label>Title</label> <br/>
             <input {...register("title", { required: true })} /> <br/>
             {errors.title && <span>{errors.title.message}</span>} <br/>
            
             <label>Price</label> <br/>
             <input type="number" {...register("price", { required: true })} /> <br/>
             {errors.price && <span>{errors.price.message}</span>}<br/>

             <label>Description</label><br/>
             <textarea  {...register("description", { required: true })} /> <br/>
             {errors.description && <span>{errors.description.message}</span>} <br/>

             <label>Image</label> <br/>
             <input type="url" {...register("image", { required: true })} /> <br/>
             {errors.image && <span>{errors.image.message}</span>} <br/>

             <label>Category</label> <br/>
             <select  {...register("category", { required: true })}>
                <option value="">Select Category</option>
               {vm.categories.map((category: Category) => {
                return (
                    <option key={category.id} value={category.id}>{category.name}</option>
                )
               })}
             </select> <br/>
              {errors.category && <span>{errors.category.message}</span>}

             <input type="submit" disabled={vm.isSubmittingForm} />
            </form>
        </>
    )
})