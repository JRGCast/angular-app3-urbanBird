interface OfferImgObj {
  url: string
}

// entidade => algo que seja importante para a aplicação
export class Offer {
  public id!: number
  public titulo!: string
  public categoria!: string
  public descricao_oferta!: string
  public anunciante!: string
  public valor!: number
  public destaque!: boolean
  public imagens!: Array<OfferImgObj>
  constructor() { }
}

export class HTUOrWIResponse {
  public id!: number
  public descricao!: string
}