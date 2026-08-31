import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { MagazineManager, type MagazineItem } from "@/components/admin/MagazineManager";
import { getAdminMagazine } from "@/lib/iirc-api";


export const dynamic="force-dynamic";


export default async function AdminMagazinePage(){


  const session=await auth();


  if(!session?.user){

    redirect("/login");

  }



  const token=(session.user as any).apiToken;



  let items:MagazineItem[]=[];



  try{


    const records=await getAdminMagazine(token);



    items=records.map((item:any)=>({

      id:String(item.id),

      title:item.title,

      edition:item.edition ?? "",

      description:item.description ?? "",

      cover:item.cover_image,

      fileUrl:item.file_url,

      isPublished:Boolean(Number(item.is_published ?? 1)),

      publishedAt:item.published_at ?? item.created_at,

      createdAt:item.created_at

    }));



  }catch(error){

    items=[];

  }



  return(

    <div className="space-y-6">

      <MagazineManager
        initialItems={items}
      />

    </div>

  );


}