#include<stdio.h>

int main(void){
	FILE *fp;
	int gold,temple_nu,population[32][38],population_all,i,j,k,hura;
	fp = fopen("data.txt", "r");
	fscanf(fp,"%d",&gold);
	fscanf(fp,"%d",&population_all);
	fscanf(fp,"%d",&temple_nu);
	int temple_x[temple_nu],temple_y[temple_nu],hue_1,hue_2,hue_3,hue_4; //hue_1は左上,hue_2は右上,hue_3は左下,hue_4右下
	for(i=0;i<temple_nu;i++){
		fscanf(fp,"%d",&temple_x[i]);
		fscanf(fp,"%d",&temple_y[i]);
	}
	for(i=0;i<38;i++){
		for(j=0;j<32;j++){
			fscanf(fp,"%d",&population[j][i]);
		}
	}
	fclose(fp);
	for(k=0;k<temple_nu;k++){
		if()
	}
	for(i=0;i<38;i++){
		for(j=0;j<32;j++){
			hura=0;
			if(11<j && j<20 && i<10 ){
				hura=1;
				printf("%d",hura);
			}
			if(hura!=1){
				for(k=0;k<temple_nu;k++){
					if(temple_y[k]==j && temple_x[k]==i){
						printf("O");
						hura=1;
					}
				}
			}
			if(hura!=1){
				printf("e");
			}
		}
		printf("\n");
	}
	return 0;
}
