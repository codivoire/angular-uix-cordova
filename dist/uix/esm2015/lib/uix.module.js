import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ConfigToken } from "./providers/config";
const DECLARATIONS = [];
export class UixModule {
    static forRoot(config) {
        return {
            ngModule: UixModule,
            providers: [
                {
                    provide: ConfigToken,
                    useValue: config
                }
            ]
        };
    }
}
UixModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: DECLARATIONS,
                exports: DECLARATIONS
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWl4Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3VpeC8iLCJzb3VyY2VzIjpbImxpYi91aXgubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU5RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFakQsTUFBTSxZQUFZLEdBQUcsRUFBRSxDQUFDO0FBT3hCLE1BQU0sT0FBTyxTQUFTO0lBQ3BCLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTztRQUNwQixPQUFPO1lBQ0wsUUFBUSxFQUFFLFNBQVM7WUFDbkIsU0FBUyxFQUFFO2dCQUNUO29CQUNFLE9BQU8sRUFBRSxXQUFXO29CQUNwQixRQUFRLEVBQUUsTUFBTTtpQkFDakI7YUFDRjtTQUNGLENBQUM7SUFDSixDQUFDOzs7WUFoQkYsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztnQkFDdkIsWUFBWSxFQUFFLFlBQVk7Z0JBQzFCLE9BQU8sRUFBRSxZQUFZO2FBQ3RCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5pbXBvcnQgeyBDb25maWdUb2tlbiB9IGZyb20gXCIuL3Byb3ZpZGVycy9jb25maWdcIjtcblxuY29uc3QgREVDTEFSQVRJT05TID0gW107XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IERFQ0xBUkFUSU9OUyxcbiAgZXhwb3J0czogREVDTEFSQVRJT05TXG59KVxuZXhwb3J0IGNsYXNzIFVpeE1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZz8pOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFVpeE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogQ29uZmlnVG9rZW4sXG4gICAgICAgICAgdXNlVmFsdWU6IGNvbmZpZ1xuICAgICAgICB9XG4gICAgICBdXG4gICAgfTtcbiAgfVxufVxuIl19