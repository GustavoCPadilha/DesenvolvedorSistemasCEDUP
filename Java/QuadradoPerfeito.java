package QuadradoPerfeito;


public class QuadradoPerfeito
{

    public static void main(String[] args) 
    {
        int[][] matriz = new int[3][3];
        int j = 0;
        int num = 0;
        for (int i = 0; i < 3; i++)
        {
            for (j = 0; j <= 2; j++)
            {
                matriz[i][j] += num;
                num++;
            }
        }
        
        int linha1 = 0;
        int linha2 = 0;
        int linha3 = 0;
        int coluna1 = 0;
        int coluna2 = 0;
        int coluna3 = 0;

        for (int i = 0; i < 3; i++)
        {
            for (j = 0; j < 3; j++)
            {
                if (i == 0)
                {
                    linha1 += matriz[i][j];
                }
                if (i == 1)
                {
                    linha2 += matriz[i][j];
                }
                if (i == 2)
                {
                    linha3 += matriz[i][j];                                    
                }
                
                if (j == 0)
                {
                    coluna1 += matriz[i][j];
                }
                if (j == 1)
                {
                    coluna2 += matriz[i][j];
                }
                if (j == 2)
                {
                coluna3 += matriz[i][j];                                    
                }
            }
        }
        
        for (int i = 0; i < 3; i++)
        {
            for (j = 0; j < 3; j++)
            {
                System.out.printf("%d ", matriz[i][j]);
            }
            System.out.println();
        }
        
        System.out.printf("llinha 1: %d\nlinha 2: %d\nlinha 3: %d\n", linha1, linha2, linha3);
        System.out.printf("coluna 1: %d\ncoluna 2: %d\ncoluna 3: %d\n", coluna1, coluna2, coluna3);
        int diagonal1 = matriz[0][0] + matriz[1][1] + matriz[2][2];
        int diagonal2 = matriz[0][2] + matriz[1][1] + matriz[2][0];
        System.out.printf("diagonal 1: %d\ndiagonal 2: %d", diagonal1, diagonal2);
        if (linha1 == linha2 && linha1 == linha3 && linha1 == coluna1 && linha1 == coluna2 && linha1 == coluna3
                && linha1 == diagonal1 && linha1 == diagonal2)
        {
            System.out.println("Isso e um quadrado perfeito!");
        }
        else
        {
            System.out.println("Isso nao e um quadrado perfeito");
        }
    }
}