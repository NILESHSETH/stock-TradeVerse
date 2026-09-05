// import {inngest} from "@/lib/inngest/client";
// import {NEWS_SUMMARY_EMAIL_PROMPT, PERSONALIZED_WELCOME_EMAIL_PROMPT} from "@/lib/inngest/prompts";
// import {sendNewsSummaryEmail, sendWelcomeEmail} from "@/lib/nodemailer";
// import {getAllUsersForNewsEmail} from "@/lib/actions/user.action";
// import { getWatchlistSymbolsByEmail } from "@/lib/actions/watchlist.actions";
// import { getNews } from "@/lib/actions/finnhub.actions";
// import { getFormattedTodayDate } from "@/lib/utils";

// export const sendSignUpEmail = inngest.createFunction(
//     {
//         id: 'sign-up-email',
//         triggers: [{ event: 'app/user.created' }],
//     },
//     async ({ event, step }) => {
//         const userProfile = `
//             - Country: ${event.data.country}
//             - Investment goals: ${event.data.investmentGoals}
//             - Risk tolerance: ${event.data.riskTolerance}
//             - Preferred industry: ${event.data.preferredIndustry}
//         `

//         const prompt = PERSONALIZED_WELCOME_EMAIL_PROMPT.replace('{{userProfile}}', userProfile)

//         const response = await step.ai.infer('generate-welcome-intro', {
//             model: step.ai.models.gemini({ model: 'gemini-3.5-flash-lite' }),
//             body: {
//                 contents: [
//                     {
//                         role: 'user',
//                         parts: [
//                             { text: prompt }
//                         ]
//                     }
//                 ]
//             }
//         })
//         await step.run('send-welcome-email', async () => {
//             const part = response.candidates?.[0]?.content?.parts?.[0];
//             const introText = (part && 'text' in part ? part.text : null) ||'Thanks for joining Signalist. You now have the tools to track markets and make smarter moves.'

//             const { data: { email, name } } = event;

//             return await sendWelcomeEmail({ email, name, intro: introText });
//         })

//         return {
//             success: true,
//             message: 'Welcome email sent successfully'
//         }
//     }
// )

// export const sendDailyNewsSummary = inngest.createFunction(
//     { id: 'daily-news-summary' },
//     [ { event: 'app/send.daily.news' }, { cron: '0 12 * * *' } ],
//     async ({ step }) => {
//         // Step #1: Get all users for news delivery
//         const users = await step.run('get-all-users', getAllUsersForNewsEmail)

//         if(!users || users.length === 0) return { success: false, message: 'No users found for news email' };

//         // Step #2: For each user, get watchlist symbols -> fetch news (fallback to general)
//         const results = await step.run('fetch-user-news', async () => {
//             const perUser: Array<{ user: UserForNewsEmail; articles: MarketNewsArticle[] }> = [];
//             for (const user of users as UserForNewsEmail[]) {
//                 try {
//                     const symbols = await getWatchlistSymbolsByEmail(user.email);
//                     let articles = await getNews(symbols);
//                     // Enforce max 6 articles per user
//                     articles = (articles || []).slice(0, 6);
//                     // If still empty, fallback to general
//                     if (!articles || articles.length === 0) {
//                         articles = await getNews();
//                         articles = (articles || []).slice(0, 6);
//                     }
//                     perUser.push({ user, articles });
//                 } catch (e) {
//                     console.error('daily-news: error preparing user news', user.email, e);
//                     perUser.push({ user, articles: [] });
//                 }
//             }
//             return perUser;
//         });

//         // Step #3: (placeholder) Summarize news via AI
//         const userNewsSummaries: { user: UserForNewsEmail; newsContent: string | null }[] = [];

//         for (const { user, articles } of results) {
//                 try {
//                     const prompt = NEWS_SUMMARY_EMAIL_PROMPT.replace('{{newsData}}', JSON.stringify(articles, null, 2));

//                     const response = await step.ai.infer(`summarize-news-${user.email}`, {
//                         model: step.ai.models.gemini({ model: 'gemini-2.5-flash-lite' }),
//                         body: {
//                             contents: [{ role: 'user', parts: [{ text:prompt }]}]
//                         }
//                     });

//                     const part = response.candidates?.[0]?.content?.parts?.[0];
//                     const newsContent = (part && 'text' in part ? part.text : null) || 'No market news.'

//                     userNewsSummaries.push({ user, newsContent });
//                 } catch (e) {
//                     console.error('Failed to summarize news for : ', user.email);
//                     userNewsSummaries.push({ user, newsContent: null });
//                 }
//             }

//         // Step #4: (placeholder) Send the emails
//         await step.run('send-news-emails', async () => {
//                 await Promise.all(
//                     userNewsSummaries.map(async ({ user, newsContent}) => {
//                         if(!newsContent) return false;

//                         return await sendNewsSummaryEmail({ email: user.email, date: getFormattedTodayDate(), newsContent })
//                     })
//                 )
//             })

//         return { success: true, message: 'Daily news summary emails sent successfully' }
//     }
// )

// // gemni
// import { inngest } from "@/lib/inngest/client";
// import { NEWS_SUMMARY_EMAIL_PROMPT, PERSONALIZED_WELCOME_EMAIL_PROMPT } from "@/lib/inngest/prompts";
// import { sendNewsSummaryEmail, sendWelcomeEmail } from "@/lib/nodemailer";
// import { getAllUsersForNewsEmail } from "@/lib/actions/user.action";
// import { getWatchlistSymbolsByEmail } from "@/lib/actions/watchlist.actions";
// import { getNews } from "@/lib/actions/finnhub.actions";
// import { getFormattedTodayDate } from "@/lib/utils";

// export const sendSignUpEmail = inngest.createFunction(
//     // Argument 1: Configuration (including triggers)
//     {
//         id: 'sign-up-email',
//         triggers: [{ event: 'app/user.created' }],
//     },
//     // Argument 2: Handler
//     async ({ event, step }) => {
//         const userProfile = `
//             - Country: ${event.data.country}
//             - Investment goals: ${event.data.investmentGoals}
//             - Risk tolerance: ${event.data.riskTolerance}
//             - Preferred industry: ${event.data.preferredIndustry}
//         `

//         const prompt = PERSONALIZED_WELCOME_EMAIL_PROMPT.replace('{{userProfile}}', userProfile)

//         const response = await step.ai.infer('generate-welcome-intro', {
//             model: step.ai.models.gemini({ model: 'ggemini-2.5-flash-lite' }),
//             body: {
//                 contents: [
//                     {
//                         role: 'user',
//                         parts: [
//                             { text: prompt }
//                         ]
//                     }
//                 ]
//             }
//         })
        
//         await step.run('send-welcome-email', async () => {
//             const part = response.candidates?.[0]?.content?.parts?.[0];
//             const introText = (part && 'text' in part ? part.text : null) || 'Thanks for joining Signalist. You now have the tools to track markets and make smarter moves.'

//             const { data: { email, name } } = event;

//             // Await the email send, but return a simple JSON object for Inngest step serialization
//             await sendWelcomeEmail({ email, name, intro: introText });
//             return { success: true }; 
//         })

//         return {
//             success: true,
//             message: 'Welcome email sent successfully'
//         }
//     }
// )

// export const sendDailyNewsSummary = inngest.createFunction(
//     // Argument 1: Configuration (including multiple triggers in the array)
//     { 
//         id: 'daily-news-summary',
//         triggers: [{ event: 'app/send.daily.news' }, { cron: '0 12 * * *' }]
//     },
//     // Argument 2: Handler
//     async ({ step }) => {
//         // Step #1: Get all users for news delivery
//         const users = await step.run('get-all-users', getAllUsersForNewsEmail)

//         if(!users || users.length === 0) return { success: false, message: 'No users found for news email' };

//         // Step #2: For each user, get watchlist symbols -> fetch news (fallback to general)
//         const results = await step.run('fetch-user-news', async () => {
//             const perUser: Array<{ user: any; articles: any[] }> = []; 
//             for (const user of users as any[]) {
//                 try {
//                     const symbols = await getWatchlistSymbolsByEmail(user.email);
//                     let articles = await getNews(symbols);
//                     // Enforce max 6 articles per user
//                     articles = (articles || []).slice(0, 6);
//                     // If still empty, fallback to general
//                     if (!articles || articles.length === 0) {
//                         articles = await getNews();
//                         articles = (articles || []).slice(0, 6);
//                     }
//                     perUser.push({ user, articles });
//                 } catch (e) {
//                     console.error('daily-news: error preparing user news', user.email, e);
//                     perUser.push({ user, articles: [] });
//                 }
//             }
//             return perUser;
//         });

//         // Step #3: Summarize news via AI
//         const userNewsSummaries: { user: any; newsContent: string | null }[] = [];

//         for (const { user, articles } of results) {
//             try {
//                 const prompt = NEWS_SUMMARY_EMAIL_PROMPT.replace('{{newsData}}', JSON.stringify(articles, null, 2));

//                 const response = await step.ai.infer(`summarize-news-${user.email}`, {
//                     model: step.ai.models.gemini({ model: 'gemini-2.5-flash-lite' }), 
//                     body: {
//                         contents: [{ role: 'user', parts: [{ text:prompt }]}]
//                     }
//                 });

//                 const part = response.candidates?.[0]?.content?.parts?.[0];
//                 const newsContent = (part && 'text' in part ? part.text : null) || 'No market news.'

//                 userNewsSummaries.push({ user, newsContent });
//             } catch (e) {
//                 console.error('Failed to summarize news for : ', user.email);
//                 userNewsSummaries.push({ user, newsContent: null });
//             }
//         }

//         // Step #4: Send the emails
//         await step.run('send-news-emails', async () => {
//             await Promise.all(
//                 userNewsSummaries.map(async ({ user, newsContent}) => {
//                     if(!newsContent) return false;
//                     await sendNewsSummaryEmail({ email: user.email, date: getFormattedTodayDate(), newsContent })
//                     return true;
//                 })
//             )
//             // Return simple JSON object for Inngest step serialization
//             return { success: true }; 
//         })

//         return { success: true, message: 'Daily news summary emails sent successfully' }
//     }
// )
//clude
import { inngest } from "@/lib/inngest/client";
import { NEWS_SUMMARY_EMAIL_PROMPT, PERSONALIZED_WELCOME_EMAIL_PROMPT } from "@/lib/inngest/prompts";
import { sendNewsSummaryEmail, sendWelcomeEmail } from "@/lib/nodemailer";
import { getAllUsersForNewsEmail } from "@/lib/actions/user.action";
import { getWatchlistSymbolsByEmail } from "@/lib/actions/watchlist.actions";
import { getNews } from "@/lib/actions/finnhub.actions";
import { getFormattedTodayDate } from "@/lib/utils";

// Shared helper to call Gemini directly, bypassing Inngest's step.ai.infer gemini adapter
async function callGemini(prompt: string): Promise<string | null> {
    const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [
                    {
                        role: 'user',
                        parts: [{ text: prompt }]
                    }
                ]
            })
        }
    );

    if (!res.ok) {
        console.error('Gemini API error:', res.status, await res.text());
        return null;
    }

    const data = await res.json();
    const part = data.candidates?.[0]?.content?.parts?.[0];
    return (part && 'text' in part ? part.text : null) || null;
}

export const sendSignUpEmail = inngest.createFunction(
    {
        id: 'sign-up-email',
        triggers: [{ event: 'app/user.created' }],
    },
    async ({ event, step }) => {
        const userProfile = `
            - Country: ${event.data.country}
            - Investment goals: ${event.data.investmentGoals}
            - Risk tolerance: ${event.data.riskTolerance}
            - Preferred industry: ${event.data.preferredIndustry}
        `

        const prompt = PERSONALIZED_WELCOME_EMAIL_PROMPT.replace('{{userProfile}}', userProfile)

        const introText = await step.run('generate-welcome-intro', async () => {
            return (await callGemini(prompt)) ||
                'Thanks for joining Signalist. You now have the tools to track markets and make smarter moves.';
        });

        await step.run('send-welcome-email', async () => {
            const { data: { email, name } } = event;

            await sendWelcomeEmail({ email, name, intro: introText });
            return { success: true };
        })

        return {
            success: true,
            message: 'Welcome email sent successfully'
        }
    }
)

export const sendDailyNewsSummary = inngest.createFunction(
    {
        id: 'daily-news-summary',
        triggers: [{ event: 'app/send.daily.news' }, { cron: '0 12 * * *' }]
    },
    async ({ step }) => {
        // Step #1: Get all users for news delivery
        const users = await step.run('get-all-users', getAllUsersForNewsEmail)

        if (!users || users.length === 0) return { success: false, message: 'No users found for news email' };

        // Step #2: For each user, get watchlist symbols -> fetch news (fallback to general)
        const results = await step.run('fetch-user-news', async () => {
            const perUser: Array<{ user: any; articles: any[] }> = [];
            for (const user of users as any[]) {
                try {
                    const symbols = await getWatchlistSymbolsByEmail(user.email);
                    let articles = await getNews(symbols);
                    articles = (articles || []).slice(0, 6);
                    if (!articles || articles.length === 0) {
                        articles = await getNews();
                        articles = (articles || []).slice(0, 6);
                    }
                    perUser.push({ user, articles });
                } catch (e) {
                    console.error('daily-news: error preparing user news', user.email, e);
                    perUser.push({ user, articles: [] });
                }
            }
            return perUser;
        });

        // Step #3: Summarize news via AI
        const userNewsSummaries: { user: any; newsContent: string | null }[] = [];

        for (const { user, articles } of results) {
    const newsContent = await step.run(`summarize-news-${user.email}`, async () => {
        try {
            const prompt = NEWS_SUMMARY_EMAIL_PROMPT.replace('{{newsData}}', JSON.stringify(articles, null, 2));
            const result = await callGemini(prompt);
            if (!result) {
                console.error(`Gemini returned null/empty for ${user.email}`);
            }
            return result || 'No market news.';
        } catch (e) {
            console.error('Failed to summarize news for:', user.email, e);
            return null;
        }
    });

    userNewsSummaries.push({ user, newsContent });
}

        // Step #4: Send the emails
        await step.run('send-news-emails', async () => {
            await Promise.all(
                userNewsSummaries.map(async ({ user, newsContent }) => {
                    if (!newsContent) return false;
                    await sendNewsSummaryEmail({ email: user.email, date: getFormattedTodayDate(), newsContent })
                    return true;
                })
            )
            return { success: true };
        })

        return { success: true, message: 'Daily news summary emails sent successfully' }
    }
)