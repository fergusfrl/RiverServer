const gql = require("graphql-tag").gql;
const ApolloClient = require("apollo-boost").ApolloClient;

// const client = new ApolloClient({
//     uri: "http://localhost:3030/graphql"
// });

const getFlowData = gaugeNames => {
    const someGauges = gql`
    {
        someGauges(siteNames: ${gaugeNames}) {
            siteName
            lastUpdated
            currentFlow
            currentLevel
        }
    }
`;

    client
        .query({
            query: someGauges
        })
        .then(res => {
            console.log(res.data.someGauges);
        });
};

module.exports = getFlowData;
