export class CompositeBalanceDto{
    VET?:string;
    VTHO?:string;
    EHRT?:string;

    constructor(vet?:string,vtho?:string,ehrt?:string){
        if(vet) this.VET=vet;
        if(vtho) this.VTHO=vtho;
        if(ehrt) this.EHRT=ehrt;
    }
}