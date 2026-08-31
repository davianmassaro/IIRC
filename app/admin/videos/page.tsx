import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { VideoManager, type VideoItem } from "@/components/admin/VideoManager";
import { getAdminVideos } from "@/lib/iirc-api";


export const dynamic = "force-dynamic";


export default async function AdminVideosPage(){

  const session = await auth();


  if(!session?.user){
    redirect("/login");
  }


  const token=(session.user as any).apiToken;


  let items:VideoItem[]=[];



  try{


    const records=await getAdminVideos(token);



    items=records.map((item:any)=>({

      id:String(item.id),

      title:item.title,

      description:item.description ?? "",

      embedUrl:item.video_url,

      thumbnail:item.thumbnail,

      isPublished:Boolean(Number(item.is_published ?? 1)),

      eventTitle:item.event_title ?? null,

      createdAt:
        new Date(item.created_at)
        .toLocaleDateString("id-ID",{
          day:"numeric",
          month:"short",
          year:"numeric"
        })

    }));


  }catch(error){

    items=[];

  }



  return(

    <div className="space-y-6">

      <VideoManager
        initialItems={items}
      />

    </div>

  );

}