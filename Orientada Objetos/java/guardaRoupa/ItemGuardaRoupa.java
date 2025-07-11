package gustavo.guardaroupa;


public abstract class ItemGuardaRoupa {
    protected String marca, tamanho, cor, material;
    protected boolean suja, usando;

    public ItemGuardaRoupa(String marca, String cor, String tamanho, String material) {
        this.marca = marca;
        this.cor = cor;
        this.tamanho = tamanho;
        this.material = material;
        this.suja = false;
        this.usando = false;
    }
    
    public void usar() {
        if (!this.isUsando()) 
        {
            if (!this.isSuja())
            {
                System.out.println("Vestindo...");
                this.setUsando(true);
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
    
    public void tirar() {
        if (this.isUsando())
        {
            System.out.println("Tirando...");
            this.setUsando(false);
            this.setSuja(true);        
        }
        else
        {
            System.out.println("Você não está vestido!");
        }
    }
    
    public void lavar() {
        if (this.isSuja())
        {
            System.out.println("Lavando...");
            this.setSuja(false);
        }
        else
        {
            System.out.println("Não está suja!");
        }
    }
    
    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public String getCor() {
        return cor;
    }

    public void setCor(String cor) {
        this.cor = cor;
    }

    public String getTamanho() {
        return tamanho;
    }

    public void setTamanho(String tamanho) {
        this.tamanho = tamanho;
    }

    public String getMaterial() {
        return material;
    }

    public void setMaterial(String material) {
        this.material = material;
    }

    public boolean isSuja() {
        return suja;
    }

    public void setSuja(boolean suja) {
        this.suja = suja;
    }

    public boolean isUsando() {
        return usando;
    }

    public void setUsando(boolean usando) {
        this.usando = usando;
    }
    
}