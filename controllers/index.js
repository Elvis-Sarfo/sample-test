const {
  openai,
  huggingface,
  pdfUtils,
  webScrapper,
  googleai,
  file,
  compromise
} = require('../utils');


const getHomeHandler = (req, res) => {
  res.render('index.ejs', { title: 'Sample Test' });
}

const postPDFHandler = async (req, res) => {
  try {
    if (!req.file) new Error('Select a file!')

    // Get PDF data
    const dataBuffer = req.file.buffer;

    // Extract text data from PDF
    const pdfData = await pdfUtils.extractTextData(dataBuffer);

    // Get company info from PDF Text Content
    const companyInfo = await huggingface.readCompanyDataFromText(pdfData);

    const msg = `Generate a report ${companyInfo.companyName} under each of the sub topics below:
    1. Assess the market: State the market size, growth, trends, and dynamics of the industry and sector where the opportunity operates. You want to evaluate the demand, competition, regulation, and innovation potential of the market. You can use sources such as industry reports, trade publications, market research firms, and online databases to gather relevant data and insights.
    2. Analyze the team: Write the background, skills, experience, and vision of the founders and key employees of the opportunity. You want to assess their ability to execute, lead, and scale the business. You can use sources such as LinkedIn, Crunchbase, AngelList, and online media to learn more about their profiles, achievements, and reputation.
    3. Evaluate the product: The third step is to review the product or service that the opportunity offers, and how it solves a problem or meets a need for the customers. You want to evaluate the value proposition, differentiation, traction, and scalability of the product. You can use sources such as demos, testimonials, reviews, and feedback to see how the product works and performs.
    4. Estimate the valuation: Write an estimation the valuation of the opportunity, and how much equity and return you can expect from investing in it. You want to use a combination of methods, such as market multiples, discounted cash flow, and scorecard, to calculate a reasonable and realistic valuation. You can use sources such as financial statements, projections, and comparable deals to support your valuation.
    5. Verify the due diligence: Verify the due diligence process, and how the opportunity has complied with the legal, financial, and operational requirements and standards. You want to check the documents, contracts, agreements, and records that confirm the validity and viability of the opportunity. You can use sources such as lawyers, accountants, and advisors to conduct the due diligence.
    6. Explore the fit: Explore the fit between you an investor and the opportunity, and how you can add value and benefit from the partnership. You want to consider the alignment of vision, goals, culture, and expectations between you and the founders. You can use sources such as meetings, conversations, and references to establish rapport and trust with the opportunity.
    7. Here’s what else to consider: share examples, stories, or insights that don’t fit into any of the previous sections. What else would you like to add?
    convert heading to h1 and paragraph to p
    `;
    // Generate report
    const report = await openai.generateReport(msg);

    // Respond with report
    res.json({ result: report })
  } catch (error) {
    res.json({ result: error.message })
  }
}

module.exports = {
  getHomeHandler,
  postPDFHandler
}

