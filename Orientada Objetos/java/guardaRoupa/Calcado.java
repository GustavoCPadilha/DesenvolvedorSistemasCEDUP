package gustavo.guardaroupa;


public class Calcado extends ItemGuardaRoupa{
    
    public Calcado(String marca, String cor, String tamanho, String material) {
        super(marca, cor, tamanho, material);
    }

    @Override
    public String toString() {
        return "Calcado{" + '}';
    }
}