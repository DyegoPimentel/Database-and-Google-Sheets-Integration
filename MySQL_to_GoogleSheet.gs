function MySQL() {  
      /* 
       * Dados de Conexão 
       * 
       * Altere os dados abaixo com os dados de sua conexão
       */
      var BANCO = "mysql"; // Conector do banco
      var HOST = "0.0.0.0"; // IP (0.0.0.0) ou HOST (seudominio.com.br)
      var PORTA = "3306"; // Porta para conexão
      var BANCODEDADOS = "" // Banco de dados desejado
      var USUARIO = ""; // Usuario
      var SENHA = ""; // Senha
      var ABA = "base" // Aba para imprimir os resultados
      
      var start = new Date(); // Debug, vamos usar para saber o tempo de execução do script
   
      // Google Planilhas       
      var doc = SpreadsheetApp.getActiveSpreadsheet(); // Retorna a aba ativa 
      var base = doc.getSheetByName(ABA); // Selecionamos a aba para limpar os dados
      base.clear();  // Limpamos todos os dados
   
      var cell = doc.getRange('a1'); // Vamos inserir os dados a partir da primeira célula
 
      // Criamos a conexão com o banco de dados 
  var conn = Jdbc.getConnection("jdbc:" + BANCO +"://" + HOST + ":" + PORTA + "/" + BANCODEDADOS,  USUARIO, SENHA);
      var stmt = conn.createStatement();
      var rs = stmt.executeQuery("SELECT * FROM  bancodedados.tabela"); // Executamos a query para buscar em nosso banco de dados
       
      var row = 0;
      var getCount = rs.getMetaData().getColumnCount(); // Contamos quantas colunas a consulta retornou
       
      for (var i = 0; i < getCount; i++){  
         cell.offset(row, i).setValue(rs.getMetaData().getColumnName(i+1)); // Adicionamos os nomes para as colunas
      }  
       
      var row = 1; 
      while (rs.next()) {
        for (var col = 0; col < rs.getMetaData().getColumnCount(); col++) { 
          cell.offset(row, col).setValue(rs.getString(col + 1)); // Adicionamos os dados por linha
        }
        row++;
      }
       
      rs.close();
      stmt.close();
      conn.close();
      var end = new Date();
      Logger.log('Tempo de execução: ' + (end.getTime() - start.getTime())); // Geramos um log de tempo execução
    } 

