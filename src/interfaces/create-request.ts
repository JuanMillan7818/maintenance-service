import { ApiExtraModels } from "@nestjs/swagger";

@ApiExtraModels()
export class ResCreateRequest {
    constructor(name_expert: string, last_name_expert: string, number_request: string) {
        this.name_expert_assign = name_expert;
        this.last_name_expert_assign = last_name_expert;
        this.number_request = number_request;    
    }    
    name_expert_assign: string;
    last_name_expert_assign: string;    
    number_request: string;   
}