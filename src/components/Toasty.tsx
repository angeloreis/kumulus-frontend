export function showToastStatus(code, toast) {
    if (code == '200') {
      toast({
        title: 'Requisição completa',
        description: 'Sua requisição foi concluída com sucesso!',
        position: 'top-right',
        status: 'success',
        duration: 9000,
        isClosable: true});
    }

    if (code == '404') {
        toast({
          title: 'Falha na Requisição',
          description: 'Sua requisição não foi concluída!',
          position: 'top-right',
          status: 'warning',
          duration: 9000,
          isClosable: true})
    }  
}