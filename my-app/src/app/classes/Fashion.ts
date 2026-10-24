export class Fashion {
  constructor(
    public _id: any = null,
    public IdF: number = 0,          
    public style: string = "",
    public fashion_subject: string = "",
    public fashion_detail: string = "",
    public fashion_image: string = "",
    public jaccardSimilarity: number = 0,
    public slug: string = ""           
  ) {}

  getBase64String(): string {
    if (!this.fashion_image) return "";
    if (!this.fashion_image.startsWith("data:image")) {
      return "data:image/png;base64," + this.fashion_image;
    }
    return this.fashion_image;
  }
}