import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { GalleryManager, type GalleryItem } from "@/components/admin/GalleryManager";
import { getAdminGallery } from "@/lib/iirc-api";


export const dynamic = "force-dynamic";


export default async function AdminGalleryPage() {

  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }


  const token = (session.user as any).apiToken;


  let items: GalleryItem[] = [];


  try {

    const records = await getAdminGallery(token);


    items = records.map((item:any)=>({

      id:String(item.id),

      title:item.title,

      imageUrl:item.image_url,

      driveUrl:item.drive_url ?? null,

      caption:item.description ?? "",

      order:Number(item.display_order ?? 0),

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


  } catch(error){

    items=[];

  }



  return (

    <div className="space-y-6">

      <GalleryManager
        initialItems={items}
      />

    </div>

  );

}