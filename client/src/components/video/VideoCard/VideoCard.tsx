import { AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Play } from "lucide-react";

export default function VideoCard(){
      return <>
        <ScrollArea className="h-[calc(100vh-9rem)] ">
             
                <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  
                  {[...Array(12)].map((_, i) => (

                    <Card key={i} className="bg-white bg-opacity-80 backdrop-blur-sm shadow-md overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                      <CardHeader className="p-0">
                        <div className="relative aspect-video bg-gradient-to-br from-red-500 via-purple-500 to-blue-500">
                          <img
                            src={`/placeholder.svg?height=180&width=320&text=Video+${i + 1}`}
                            alt={`Video thumbnail ${i + 1}`}
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Play className="w-12 h-12 text-white" />
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4">
                        <CardTitle className="text-lg mb-2 line-clamp-2 text-gray-800">Awesome Colorful Video Title {i + 1}</CardTitle>
                        <div className="flex items-center space-x-2">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Channel" />
                            <AvatarFallback>CH</AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-gray-600">Vibrant Channel</span>
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 text-xs text-gray-500">
                        <span>1.2M views</span>
                        <span className="mx-2">•</span>
                        <span>2 days ago</span>
                      </CardFooter>
                    </Card>

                  ))}

                </div>


              </ScrollArea>
                
      </>
}