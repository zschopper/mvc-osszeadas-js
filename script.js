import OsszeadasController from "./controller/OsszeadasController.js";

$(() => {
    const szuloElem = $(".tartalom");
    let ossze = new OsszeadasController(szuloElem);
})
