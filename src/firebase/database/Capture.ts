import EntityAbstract from "./EntityAbstract"

interface CaptureAttr {
    id?: string,
    img_url: string,
    type: "objects" | "story" | "description",
    content: string,
    language: string,
    createdAt?: string,
}

export default class CaptureManager extends EntityAbstract<CaptureAttr> {

    constructor() {
        super();
    }
    
    async create(obj: CaptureAttr) : Promise<CaptureAttr | null> {

        try {

            let capture : CaptureAttr = obj;
            throw new Error("FAILED!!!")


            return capture;


        } catch(err : any) {

            console.error(err);

            return null;

        }


    }

    async readById(id: string): Promise<CaptureAttr> {
        
        let capture : CaptureAttr = {
            id: id,
            content: "",
            img_url: "",
            language: "spanish",
            type: "description",
        }

        return capture;
    }
}

const captureManager = new CaptureManager();

captureManager.create({
    content: "content",
    img_url: "url",
    language: "spanish",
    type: "objects",
    createdAt: new Date().toISOString()
})


