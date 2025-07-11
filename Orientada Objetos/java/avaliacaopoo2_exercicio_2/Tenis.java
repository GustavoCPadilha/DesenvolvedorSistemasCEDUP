package com.mycompany.avaliacaopoo2_exercicio_2;


public class Tenis extends Calcado {
    private boolean cadarco;

    public Tenis(String marca, String cor, String tamanho, String material) {
        super(marca, cor, tamanho, material);
        this.cadarco = true;
    }
    
    public void colocarCadarco() 
    {
        if (!this.isCadarco())
        {
            System.out.println("Colocando cadarço...");
            this.setCadarco(true);
        }
        else
        {
            System.out.println("O tênis já tem cadarço!");
        }
    }
    
    public void tirarCadarco()
    {
        if (this.isCadarco())
        {
            System.out.println("Tirando cadarço...");
            this.setCadarco(false);
        }
        else
        {
            System.out.println("O já está sem cadarço");
        }
    }
    
    @Override
    public void lavar() {
        if (this.isSuja())
        {
            if (!this.isCadarco())
            {
                System.out.println("Lavando...");
                this.setSuja(false);             
            }
            else
            {
                System.out.println("Tire o cadarço antes!");
            }
        }
        else
        {
            System.out.println("Não está suja!");
        }
    }
    
    @Override
    public void usar() {
        if (!this.isUsando()) 
        {
            if (!this.isSuja())
            {
                if(this.isCadarco())
                {
                    System.out.println("Vestindo...");
                    this.setUsando(true);
                }
                else
                {
                    System.out.println("Coloque o cadarço antes de usar!");
                }
            }
            else
            {
                System.out.println("Lave antes de usar!");
            }
        } 
        else 
        {
            System.out.println("Você já está vestido!");
        }
    }

    public boolean isCadarco() {
        return cadarco;
    }

    public void setCadarco(boolean cadarco) {
        this.cadarco = cadarco;
    }


}
