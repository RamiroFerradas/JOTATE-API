import { Request, Response, Router } from "express";
const router = Router();

const {
  getAllProducts,
  getProductById,
  updateProduct,
} = require("../../controller/productsController");

router.get("/", (req: Request, res: Response) => {
  getAllProducts()
    .then((result: any) => {
      res.status(200).json(result);
    })
    .catch((error: any) => {
      res.status(500).json({ error: error.message });
    });
});
router.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  getProductById(id)
    .then((result: any) => {
      res.status(200).json(result);
    })
    .catch((error: any) => {
      res.status(500).json({ error: error.message });
    });
});

router.put("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;
  updateProduct(id, updatedData)
    .then((product: any) => {
      if (product) {
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((error: any) => {
      res.status(500).json({ error: error.message });
    });
});

module.exports = router;
