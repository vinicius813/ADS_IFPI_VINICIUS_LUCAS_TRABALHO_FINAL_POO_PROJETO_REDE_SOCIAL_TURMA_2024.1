// a. Classe Usuario
class Usuario {
    private id: number;
    private email: string;
    private apelido: string;
    private documento: string;

    constructor(id: number, email: string, apelido: string, documento: string) {
        this.id = id;
        this.email = email;
        this.apelido = apelido;
        this.documento = documento;
    }

    // Métodos de leitura (getters)
    public getId(): number {
        return this.id;
    }

    public getEmail(): string {
        return this.email;
    }

    public getApelido(): string {
        return this.apelido;
    }

    public getDocumento(): string {
        return this.documento;
    }
}

// b. Classe Publicacao
class Publicacao {
    private id: number;
    private usuario: Usuario;
    private conteudo: string;
    private dataHora: Date;

    constructor(id: number, usuario: Usuario, conteudo: string, dataHora: Date) {
        this.id = id;
        this.usuario = usuario;
        this.conteudo = conteudo;
        this.dataHora = dataHora;
    }

    // Métodos de leitura (getters)
    public getId(): number {
        return this.id;
    }

    public getUsuario(): Usuario {
        return this.usuario;
    }

    public getConteudo(): string {
        return this.conteudo;
    }

    public getDataHora(): Date {
        return this.dataHora;
    }
}

// c. Tipo enumerado TipoInteracao
enum TipoInteracao {
    Curtir = "curtir",
    NaoCurtir = "não curtir",
    Riso = "riso",
    Surpresa = "surpresa",
    Raiva = "raiva"
}

// d. Classe Interacao
class Interacao {
    private id: number;
    private publicacao: Publicacao;
    private tipoInteracao: TipoInteracao;
    private usuario: Usuario;
    private dataHora: Date;

    constructor(id: number, publicacao: Publicacao, tipoInteracao: TipoInteracao, usuario: Usuario, dataHora: Date) {
        this.id = id;
        this.publicacao = publicacao;
        this.tipoInteracao = tipoInteracao;
        this.usuario = usuario;
        this.dataHora = dataHora;
    }

    // Métodos de leitura (getters)
    public getId(): number {
        return this.id;
    }

    public getPublicacao(): Publicacao {
        return this.publicacao;
    }

    public getTipoInteracao(): TipoInteracao {
        return this.tipoInteracao;
    }

    public getUsuario(): Usuario {
        return this.usuario;
    }

    public getDataHora(): Date {
        return this.dataHora;
    }
}

// e. Classe PublicacaoAvancada (herda de Publicacao)
class PublicacaoAvancada extends Publicacao {
    private interacoes: Interacao[] = [];

    constructor(id: number, usuario: Usuario, conteudo: string, dataHora: Date) {
        super(id, usuario, conteudo, dataHora);
    }

    // Adicionar interação
    public adicionarInteracao(interacao: Interacao): void {
        this.interacoes.push(interacao);
    }

    // Método para obter todas as interações
    public getInteracoes(): Interacao[] {
        return this.interacoes;
    }
}

// Exemplo de uso:
const usuario1 = new Usuario(1, "usuario1@example.com", "user1", "123456789");
const publicacaoSimples = new Publicacao(1, usuario1, "Primeira publicação", new Date());
const publicacaoAvancada = new PublicacaoAvancada(2, usuario1, "Publicação avançada", new Date());

const interacao1 = new Interacao(1, publicacaoAvancada, TipoInteracao.Curtir, usuario1, new Date());
publicacaoAvancada.adicionarInteracao(interacao1);

console.log(publicacaoAvancada.getInteracoes());




// Exceções customizadas
class UsuarioExistenteError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "UsuarioExistenteError";
    }
}

class PublicacaoExistenteError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "PublicacaoExistenteError";
    }
}

class InteracaoExistenteError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "InteracaoExistenteError";
    }
}

// Classe RedeSocial
class RedeSocial {
    private usuarios: Usuario[] = [];
    private publicacoes: Publicacao[] = [];

    // a. Método para incluir usuário com validação de ID e e-mail
    public adicionarUsuario(usuario: Usuario): void {
        const usuarioExistente = this.usuarios.find(u => u.getId() === usuario.getId() || u.getEmail() === usuario.getEmail());
        if (usuarioExistente) {
            throw new UsuarioExistenteError("Usuário com o mesmo ID ou e-mail já existe.");
        }
        this.usuarios.push(usuario);
    }

    // Método para consultar usuário por e-mail
    public consultarUsuario(email: string): Usuario | undefined {
        return this.usuarios.find(u => u.getEmail() === email);
    }

    // a. Método para incluir publicação com validação de ID
    public adicionarPublicacao(publicacao: Publicacao): void {
        const publicacaoExistente = this.publicacoes.find(p => p.getId() === publicacao.getId());
        if (publicacaoExistente) {
            throw new PublicacaoExistenteError("Publicação com o mesmo ID já existe.");
        }
        this.publicacoes.push(publicacao);
    }

    // b. Listar todas as publicações em ordem decrescente por data de criação (feed)
    public listarPublicacoes(): void {
        const publicacoesOrdenadas = this.publicacoes.sort((a, b) => b.getDataHora().getTime() - a.getDataHora().getTime());
        publicacoesOrdenadas.forEach(pub => {
            console.log(`ID: ${pub.getId()}, Usuário: ${pub.getUsuario().getApelido()}, Data: ${pub.getDataHora()}, Conteúdo: ${pub.getConteudo()}`);
            if (pub instanceof PublicacaoAvancada) {
                console.log(`Reações: ${pub.getInteracoes().length}`);
            }
        });
    }

    // d. Método para listar publicações de um usuário específico
    public listarPublicacoesPorUsuario(email: string): void {
        const usuario = this.consultarUsuario(email);
        if (!usuario) {
            console.log("Usuário não encontrado.");
            return;
        }

        const publicacoesDoUsuario = this.publicacoes.filter(p => p.getUsuario().getEmail() === email);
        const publicacoesOrdenadas = publicacoesDoUsuario.sort((a, b) => b.getDataHora().getTime() - a.getDataHora().getTime());

        publicacoesOrdenadas.forEach(pub => {
            console.log(`ID: ${pub.getId()}, Data: ${pub.getDataHora()}, Conteúdo: ${pub.getConteudo()}`);
        });
    }

    // e. Método para reagir a uma PublicacaoAvancada com validação
    public reagirPublicacaoAvancada(publicacaoId: number, tipoInteracao: TipoInteracao, usuario: Usuario): void {
        const publicacao = this.publicacoes.find(p => p.getId() === publicacaoId);

        if (!publicacao || !(publicacao instanceof PublicacaoAvancada)) {
            console.log("Publicação avançada não encontrada.");
            return;
        }

        // Verifica se o usuário já interagiu com a publicação
        const interacaoExistente = publicacao.getInteracoes().find(i => i.getUsuario().getId() === usuario.getId());
        if (interacaoExistente) {
            throw new InteracaoExistenteError("Usuário já interagiu com esta publicação.");
        }

        // Adiciona a interação
        const novaInteracao = new Interacao(Date.now(), publicacao, tipoInteracao, usuario, new Date());
        publicacao.adicionarInteracao(novaInteracao);

        console.log("Interação adicionada com sucesso.");
    }
}

// Exemplo de uso:
const redeSocial = new RedeSocial();

try {
    const usuario1 = new Usuario(1, "usuario1@example.com", "user1", "123456789");
    redeSocial.adicionarUsuario(usuario1);

    const publicacao1 = new Publicacao(1, usuario1, "Minha primeira publicação", new Date());
    redeSocial.adicionarPublicacao(publicacao1);

    const publicacaoAvancada = new PublicacaoAvancada(2, usuario1, "Minha publicação avançada", new Date());
    redeSocial.adicionarPublicacao(publicacaoAvancada);

    // Listar publicações (feed)
    console.log("Feed de publicações:");
    redeSocial.listarPublicacoes();

    // Listar publicações de um usuário específico
    console.log("Publicações do usuário 'user1':");
    redeSocial.listarPublicacoesPorUsuario("usuario1@example.com");

    // Adicionar interação a uma publicação avançada
    redeSocial.reagirPublicacaoAvancada(2, TipoInteracao.Curtir, usuario1);
    redeSocial.reagirPublicacaoAvancada(2, TipoInteracao.Riso, usuario1); // Deve gerar exceção
} catch (error) {
    console.error(error.message);
}






