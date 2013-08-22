#include<stdio.h>

int main(void){
	FILE *fp;
	int gold,temple_nu,population[32][38],population_point_map[32][38],population_all,i,j,k,hura;
	fp = fopen("data.txt", "r");
	fscanf(fp,"%d",&gold);
	fscanf(fp,"%d",&population_all);
	fscanf(fp,"%d",&temple_nu);
	int temple_x[temple_nu],temple_y[temple_nu],hue_1_x,hue_1_y,hue_2_x,hue_2_y; //hue_1は左上,hue_2は右下
	for(i=0;i<temple_nu;i++){
		fscanf(fp,"%d",&temple_x[i]);
		fscanf(fp,"%d",&temple_y[i]);
	}
	for(i=0;i<38;i++){
		for(j=0;j<32;j++){
			fscanf(fp,"%d",&population[j][i]);
		}
	}
	for(i=0;i<38;i++){
		for(j=0;j<32;j++){
			population_point_map[j][i]=0;
		}
	}
	population_all=0;
	fclose(fp);
	for(k=0;k<temple_nu;k++){
		hue_1_x=temple_x[k]-4;
		hue_1_y=temple_y[k]-4;
		hue_2_x=temple_x[k]+4;
		hue_2_y=temple_y[k]+4;
		if(hue_1_x<0){
			hue_1_x=0;
		}else if(11<hue_1_x && hue_1_x<20){
			hue_1_x=20;
		}
		if(hue_1_y<0){
			hue_1_y=0;
		}else if(11<temple_x[k] && temple_x[k]<20 && hue_1_y<10){
			hue_1_y=10;
		}
		if(31<hue_2_x){
			hue_2_x=31;
		}else if(11<hue_2_x && hue_2_x<20){
			hue_2_x=11;
		}
		if(37<hue_2_y){
			hue_2_y=37;
		}
		for(i=hue_1_y;i<hue_2_y;i++){
			for(j=hue_1_x;j<hue_2_x;j++){
				population_point_map[j][i]=1;
			}
		}
	}
	for(i=0;i<38;i++){
		for(j=0;j<32;j++){
			if(population_point_map[j][i]==1){
				population[j][i]+=100;
			}
			population_all+=population[j][i];
		}
	}
	gold=gold-10000*temple_nu+population_all*1;
	printf("%d\n",gold);
	printf("%d\n",population_all);
	printf("%d\n",temple_nu);
	for(i=0;i<temple_nu;i++){
		printf("%d %d\n",temple_x[i],temple_y[i]);
	}
	for(i=0;i<38;i++){
		for(j=0;j<32;j++){
			printf("%d",population[j][i]);
			if(j==31){
				printf("\n");
			}else{
				printf(" ");
			}
		}
	}
	return 0;
}
