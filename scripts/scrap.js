import { connectDB } from '../config/db';
import { CompanyService } from '../services/company';

(async () => {
  try {
    const db = await connectDB();
    await CompanyService.updateAllCompaniesAnalysis();
    db.disconnect();
  } catch (err) {
    console.log(err);
  }
})();
