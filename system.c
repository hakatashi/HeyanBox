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
	int a_x_u,a_x_n,a_y_u,a_y_n,b_x_u,b_x_n,b_y_u,b_y_n;
	for(i=0;i<38;i++){
		for(j=0;j<32;j++){
			a_x_u=j-1;
			a_x_n=j+1;
			a_y_u=i-1;
			a_y_n=i+1;
			b_x_u=j-2;
			b_x_n=j+2;
			b_y_u=i-2;
			b_y_n=i+2;
			if(b_x_u<0){
				b_x_u=0;
			}else if(11<b_x_u && b_x_u<20 && b_y_u<10){
				b_x_u=20;
			}
			if(b_y_u<0){
				b_y_u=0;
			}else if(11<i && i<20 && b_y_u<10){
				b_y_u=11;
			}
			if(b_x_n>31){
				b_x_n=31;
			}else if(11<b_x_n && b_x_n<20 && b_y_n<10){
				b_x_n=11;
			}
		}
	}
	for(k=0;k<temple_nu;k++){
		hue_1_x=temple_x[k]-4;//左の判定+本部
		hue_1_y=temple_y[k]-4;//上の判定+本部
		hue_2_x=temple_x[k]+4;//右の判定+本部
		hue_2_y=temple_y[k]+4;//下の判定
		if(hue_1_x<0){
			hue_1_x=0;//左の判定
		}
		if(12<hue_1_x && hue_1_x<20 && hue_1_y<10){
			hue_1_x=20;//本部
		}
		if(hue_1_y<0){
			hue_1_y=0;//上の判定
		}
		if(12<temple_x[k] && temple_x[k]<20 && -1<hue_1_y && hue_1_y<10){
			hue_1_y=12;//本部
		}
		if(31<hue_2_x){
			hue_2_x=31;//右の判定
		}
		if(12<hue_2_x && hue_2_x<20 && hue_2_y<10){
			hue_2_x=12;//本部
		}
		if(37<hue_2_y){
			hue_2_y=37;//下
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
