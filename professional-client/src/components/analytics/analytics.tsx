import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
export default   function Analytics(){
    
    const data = [
        { date: 'Oct 15', views: 10 },
        { date: 'Oct 20', views: 20 },
        { date: 'Oct 24', views: 40 },
        { date: 'Oct 29', views: 45 },
        { date: 'Nov 2', views: 50 },
        { date: 'Nov 7', views: 0 },
        {date: 'Nov 11', views: 20 },
    ]


    return <> 

    <div className="p-6">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Analytics</h1>
        <Button variant="outline">Last 28 days</Button>
      </div>

      <Tabs defaultValue="overview" className="mb-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
          <TabsTrigger value="inspiration">Inspiration</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid gap-6">

        <h2 className="text-2xl">Your channel didn&apos;t get any views in the last 28 days</h2>

        <div className="grid md:grid-cols-3 gap-6">

          <Card className="p-4">
            <div className="text-sm text-muted-foreground mb-2">Views</div>
            <div className="text-2xl font-semibold">—</div>
          </Card>

          <Card className="p-4">
            <div className="text-sm text-muted-foreground mb-2">Watch time (hours)</div>
            <div className="text-2xl font-semibold">—</div>
          </Card>

          <Card className="p-4">
            <div className="text-sm text-muted-foreground mb-2">Subscribers</div>
            <div className="text-2xl font-semibold">—</div>
          </Card>

        </div>

        <Card className="p-4">

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Line type="monotone" dataKey="views" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
        </Card>

        <div className="flex justify-center">
          <Button variant="outline">See more</Button>
        </div>

        <Card className="p-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <div className="text-sm text-muted-foreground">Realtime</div>
              <div className="text-xs text-muted-foreground">Updating live</div>
            </div>
            <Button variant="outline">See live count</Button>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-2xl font-semibold">0</div>
            <div className="text-sm text-muted-foreground">Views • Last 48 hours</div>
          </div>
        </Card>
      </div>
    </div>
  </>

}
