#!/usr/bin/perl
use warnings;
use strict;

die "Usage: \n$0 [NewsKeywordFile.txt]\n" if @ARGV < 1;

# Open input file, clear/create output file
my $newsTopicsFile = $ARGV[0];
open my $fh, "<", $newsTopicsFile or die "Could not open input file $newsTopicsFile\n";
open my $output, ">", "testResults.txt" or die "Could not open results file testResults.txt\n";
print $output "Timing data for News Searching\n";
close $output;
my $output = "testResults.txt";

#Authorise user and get token
my $token = `curl --request POST --url http://api.restfulnews.com/auth --header 'content-type: application/json' --data '{ "email": "steven\@restfulnews.com", "password": "accident8" }'`;
$token =~ s/^.+token\":\"(.*?)\".*$/$1/;
die "Invalid token\n" if $token =~ /[\[\{\]\}]\"/;

# Search for every word in the input file as a separate topic
foreach my $line (<$fh>) {
    my @words = split(/[ ,\.\/]/, $line);
    foreach my $topic (@words) {
        chomp $topic;
        my $url = "http://api.restfulnews.com/search?topics=";
        $url .= $topic;
        open my $companies, "<", "companies.txt" or die "Couldn't open Companies.txt\n";
        foreach my $company (<$companies>) {
            $company =~s/\r//;
            chomp $company;
            my $fullurl = $url;
            $fullurl .= "&companyids=$company";
            $fullurl =~s/\r//;
            chomp $fullurl;
            $fullurl =~ s/[^\w&\:\/\.\?\=]//;
            $fullurl = lc $fullurl;
            `/usr/bin/time --append --output=$output curl --request GET --url '$fullurl' --header 'authorization: Bearer $token' --header 'content-type: application/json'`;
        }
    }
}
close $fh;
close $output;

# Collate timing results
open my $results, "<", "testResults.txt" or die "Failed to open results file\n";
my $totalSecs = 0;
my $numTopics = 0;
foreach my $line (<$results>) {
    if ($line =~ /user.*system.*elapsed/) {
        $line =~ s/^.*(\d+:\d+\.\d+)elapsed.*$/$1/;
        my $min = $line;
        $min =~ s/(\d+):.+$/$1/;
        $min = $min * 60;
        my $sec = $line;
        $sec =~ s/^.*:(\d+.\d+).*$/$1/;
        $sec = $sec + 0;
        $totalSecs += $min + $sec;
        $numTopics += 1;
    }
}

die "===\nMassive error: No timing data reported\n===\n" if $numTopics == 0;

printf ("Average Search time:\n%.2f seconds\n", $totalSecs/$numTopics);

#`rm testResults.txt`;
#print "All cleaned up!\n";
